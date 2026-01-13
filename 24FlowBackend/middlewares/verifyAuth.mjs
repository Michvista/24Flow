import jwt from 'jsonwebtoken';
import prisma from '../db.mjs';

export const protect = async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

			// 1. Find the user
			const user = await prisma.user.findUnique({
				where: { id: decoded.id }, omit: { password: true }
			});

			if (!user) {
				return res.status(401).json({ message: 'User no longer exists' });
			}

			user.events = user.events ?? [];
			user.tasks = user.tasks ?? [];
			user.moods = user.moods ?? [];

			req.user = user;
			return next(); 
		} catch (error) {
			console.error('JWT Verify Error:', error.message);
			return res.status(401).json({ message: 'Not authorized, token failed' });
		}
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}
};
