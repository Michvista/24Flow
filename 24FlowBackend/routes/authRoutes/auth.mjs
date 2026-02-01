import express from 'express';
import passport from 'passport';
import {
	register,
	login,
	profile,
	googleAuth,
	updateProfile,
	logOut,
	deleteAccount
} from '../../controllers/authController.mjs';
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
		failureRedirect: 'http://localhost:5173/auth',
		session: false,
		failureMessage: 'Failed to login with Google'
	}),
	googleAuth
);

router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, profile);
router.patch('/update-profile', protect, updateProfile);
router.post('/logout', protect, logOut);
router.delete('/delete-account', protect, deleteAccount)

export default router;
