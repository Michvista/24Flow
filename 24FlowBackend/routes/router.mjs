import express from 'express';
import auth from './authRoutes/auth.mjs';
import event from './eventRoutes/event.mjs';
import task from './taskRoutes/task.mjs';
import tools from './AIRoutes/AIToolsRoute.mjs';
import overlap from './AIRoutes/conflictRoutes.mjs';
import timetable from './AIRoutes/timetableRoutes.mjs';
import studyPlan from './AIRoutes/studyPlanRoutes.mjs';
import createError from 'http-errors';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.post('/__debug', (req, res) => {
	console.log('[DEBUG ROUTE HIT]');
	console.log('Origin:', req.headers.origin);
	console.log('Cookies:', req.cookies);

	// Set a test cookie
	res.cookie('testCookie', 'works', {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		path: '/',
		maxAge: 60000
	});

	res.json({
		ok: true,
		origin: req.headers.origin,
		corsOrigin: process.env.FRONTEND_URL,
		receivedCookies: req.cookies
	});
});

router.use('/auth', auth);
router.use('/events', event);
router.use('/tasks', task);
router.use('/ai', tools);
router.use('/conflicts', overlap);
router.use('/timetable', timetable);
router.use('/study-plans', studyPlan);

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
