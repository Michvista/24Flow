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
				password: hashedPassword,
				events: [],
				tasks: [],
				moods: []
			}
		});

		delete user.password;

		const accessToken = await signAccessToken(user.id);

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
			throw createError.NotFound('User not registered');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw createError.Unauthorized('Email address or password not valid');
		}

		delete user.password;

		const accessToken = await signAccessToken(user.id);

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
			omit: { password: true }
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

	// cookiesOptions is not defined in this file; leaving response shape as-is
	return res.status(200).json({
		success: true,
		message: 'User login successful',
		user,
		accessToken
	});
};
