import jwt from 'jsonwebtoken';
import prisma from '../db.mjs';

export const protect = async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await prisma.user.findUnique({
				where: { id: decoded.id },
				omit: { password: true }
			});

			req.user.events = req.user.events ?? [];
			req.user.tasks = req.user.tasks ?? [];
			req.user.moods = req.user.moods ?? [];

			if (!req.user) {
				return res.status(401).json({ message: 'User no longer exists' });
			}

			next();
		} catch (error) {
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
	}

	if (!token) {
		res.status(401).json({ message: 'Not authorized, no token' });
	}
};
