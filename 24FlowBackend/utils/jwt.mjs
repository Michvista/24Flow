import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Function to create a token
export const signAccessToken = (userId) => {
	return jwt.sign({ id: userId }, accessTokenSecret, {
		expiresIn: '1h'
	});
};

// Function to verify a token
export const verifyAccessToken = (token) => {
	try {
		const payload = jwt.verify(token, accessTokenSecret);
		return payload;
	} catch (err) {
		const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
		throw createError.Unauthorized(message);
	}
};
