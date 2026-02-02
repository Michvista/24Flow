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
			secure: true, // HTTPS required
			sameSite: 'none', // cross-site
			path: '/', // root path
			maxAge: 7 * 24 * 60 * 60 * 1000
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
	console.log('[LOGIN] Request received');

	try {
		const { email, password } = req.body;

		console.log('[LOGIN] Payload:', { email, hasPassword: !!password });

		if (!email || !password) {
			console.warn('[LOGIN] Missing email or password');
			return res.status(400).json({
				status: false,
				message: 'Email and password are required'
			});
		}

		const user = await prisma.user.findUnique({
			where: { email }
		});

		console.log('[LOGIN] User found:', !!user);

		if (!user) {
			console.warn('[LOGIN] User not found:', email);
			return res.status(404).json({
				status: false,
				message: 'User not registered'
			});
		}

		if (!user.password) {
			console.warn('[LOGIN] Google-only account:', email);
			return res.status(400).json({
				status: false,
				message: 'Please login with Google for this account'
			});
		}

		const isMatch = await bcrypt.compare(String(password), String(user.password));

		console.log('[LOGIN] Password match:', isMatch);

		if (!isMatch) {
			console.warn('[LOGIN] Invalid password for:', email);
			return res.status(401).json({
				status: false,
				message: 'Email address or password not valid'
			});
		}

		console.log('[LOGIN] Signing JWT');

		const accessToken = await signAccessToken(user.id);

		if (!accessToken) {
			console.error('[LOGIN] Token generation failed');
			return res.status(500).json({
				status: false,
				message: 'Authentication failed'
			});
		}

		console.log('[LOGIN] Setting cookie');

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true, // HTTPS required
			sameSite: 'none', // cross-site
			path: '/', // root path
			maxAge: 7 * 24 * 60 * 60 * 1000
		});

		// NEVER mutate Prisma result directly
		const { password: _, ...safeUser } = user;

		console.log('[LOGIN] Success for:', email);

		return res.status(200).json({
			status: true,
			message: 'Account login successful',
			data: safeUser
		});
	} catch (err) {
		console.error('[LOGIN] FATAL ERROR:', err);
		return res.status(500).json({
			status: false,
			message: 'Internal server error'
		});
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
				tasks: true,
				sleep: true
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

	// REDIRECT BACK TO FRONTEND WITH TOKEN
	// The frontend will extract the token and store it as a cookie
	const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
	res.redirect(`${FRONTEND}/auth/callback?token=${accessToken}`);
};

export const updateProfile = async (req, res, next) => {
	try {
		const userId = req.user.id;
		// Destructure preferences from req.body
		const { name, username, bio, email, preferences, sleepLog } = req.body;

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
				// Nested Update/Create for Preferences & sleep
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
					: undefined,
				sleep: sleepLog
					? {
							upsert: {
								where: { userId: userId },
								create: {
									sleepTime: sleepLog.sleepTime,
									wakeTime: sleepLog.wakeTime
								},
								update: {
									sleepTime: sleepLog.sleepTime,
									wakeTime: sleepLog.wakeTime
								}
							}
						}
					: undefined
			},
			include: {
				preferences: true,
				sleep: true
			}
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
			secure: true,
			sameSite: 'none'
		});

		return res.status(200).json({
			status: true,
			message: 'Logged out successfully'
		});
	} catch (error) {
		next(error);
	}
};

export const deleteAccount = async (req, res, next) => {
	try {
		const userId = req.user.id;

		// Delete user and related data in a transaction
		await prisma.$transaction([
			prisma.event.deleteMany({ where: { userId } }),
			prisma.task.deleteMany({ where: { userId } }),
			prisma.timetableClass.deleteMany({ where: { userId } }),
			prisma.preferences.deleteMany({ where: { userId } }),
			prisma.sleep.deleteMany({ where: { userId } }),
			prisma.aITools.deleteMany({ where: { userId } }),
			prisma.user.delete({ where: { id: userId } })
		]);

		// Clear authentication cookie
		res.clearCookie('accessToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'none'
		});

		res.status(200).json({
			status: true,
			message: 'Account deleted successfully'
		});
	} catch (error) {
		next(error);
	}
};
