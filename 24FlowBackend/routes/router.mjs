import express from 'express';
import auth from './authRoutes/auth.mjs';
import createError from 'http-errors';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.use('/auth', auth);

router.use(async (req, res, next) => {
	next(createError.NotFound('Route not Found'));
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		status: false,
		message: err.message
	});
});

export default router;
