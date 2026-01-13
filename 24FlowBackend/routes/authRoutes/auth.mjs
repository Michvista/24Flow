import express from 'express';
import passport from 'passport';
import { register, login, profile, googleAuth } from '../../controllers/authController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Login with Google
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
		session: false
	})
);

// Google callback
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login',
		session: false,
		failureMessage: 'Failed to login with Google'
	}),
	googleAuth
);

router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, profile);

export default router;
