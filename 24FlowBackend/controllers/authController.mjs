import prisma from '../db.mjs';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { signAccessToken } from '../utils/jwt.mjs';

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			throw createError.BadRequest('Please fill all fields');
		}

		const userExists = await prisma.user.findUnique({ where: { email } });

		if (userExists) {
			throw createError.Conflict(`${email} is already registered`);
		}

		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword
			}
		});

		delete user.password;

		const accessToken = await signAccessToken(user.id);

		res.cookie('accessToken', accessToken, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 86400000 // 24 hours
});

		res.status(201).json({
			status: true,
			message: 'User created successfully',
			data: { ...user, accessToken }
		});
	} catch (e) {
		next(e);
	}
}; 


export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return res.status(404).json({
				status: false,
				message: 'User not registered'
			});
		}

		//  Check if user has a password (might be a Google-only user)
		if (!user.password) {
			return res.status(400).json({
				status: false,
				message: 'Please login with Google for this account'
			});
		}

		const isMatch = await bcrypt.compare(String(password), String(user.password));

		if (!isMatch) {
			return res.status(401).json({
				status: false,
				message: 'Email address or password not valid'
			});
		}
		delete user.password;

		const accessToken = await signAccessToken(user.id);

		res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 86400000 // 24 hours
});

		res.status(200).json({
			status: true,
			message: 'Account login successful',
			data: { ...user, accessToken }
		});
	} catch (e) {
		next(e);
	}
};

export const profile = async (req, res, next) => {
	try {
		const users = await prisma.user.findUnique({
			where: { id: req.user.id },
			omit: { password: true },
			include: {
				preferences: true,
				events: true,
				tasks: true
			}
		});
		res.status(200).json({
			status: true,
			message: 'current user',
			data: users
		});
	} catch (e) {
		next(e);
	}
};

export const googleAuth = async (req, res) => {
	const {
		id,
		_json: { name, picture, email }
	} = req.user;

	let user = await prisma.user.findUnique({ where: { googleId: id } });

	if (!user) {
		user = await prisma.user.create({
			data: {
				name,
				email,
				avatar: picture,
				googleId: id
			}
		});
	}

	// Generate tokens
	const accessToken = await signAccessToken(user.id);

	//  STORE TOKEN IN COOKIE
	res.cookie('accessToken', accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax'
	});

	// REDIRECT BACK TO FRONTEND
	res.redirect('http://localhost:5173/dashboard');
};


export const updateProfile = async (req, res, next) => {
	try {
		const userId = req.user.id;
		// Destructure preferences from req.body
		const { name, username, bio, email, preferences } = req.body;

		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) return res.status(404).json({ message: 'User not found' });

		if (email && email !== user.email) {
			const existingEmail = await prisma.user.findUnique({ where: { email } });
			if (existingEmail) return res.status(400).json({ message: 'Email already in use' });
		}

		// Updated Prisma call
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				name: name || undefined,
				username: username || undefined,
				bio: bio || undefined,
				email: email || undefined,
				// Nested Update/Create for Preferences
				preferences: preferences
					? {
							upsert: {
								where: { userId: userId },
								create: {
									timezone: preferences.timezone,
									dateFormat: preferences.dateFormat
								},
								update: {
									timezone: preferences.timezone,
									dateFormat: preferences.dateFormat
								}
							}
						}
					: undefined
			},
			include: { preferences: true }
		});

		if (email && email !== user.email) {
			res.clearCookie('accessToken');
			return res.status(200).json({
				status: true,
				message: 'Profile updated. Email changed, please log in again.',
				requiresLogout: true
			});
		}

		res.status(200).json({
			status: true,
			message: 'Profile updated successfully',
			data: updatedUser
		});
	} catch (error) {
		next(error);
	}
};


export const logOut = async (req, res, next) => {
	try {
		//  Clear the specific cookie by its name (e.g., 'accessToken')
		res.clearCookie('accessToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/'
		});

		return res.status(200).json({
			status: true,
			message: 'Logged out successfully'
		});
	} catch (error) {
		next(error);
	}
};
