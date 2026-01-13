const express = require('express');
const router = express.Router();
const passport  = require('passport');

const { register, login, profile, googleAuth } = require('../../controllers/authController');
const { protect } = require('../../middlewares/verifyAuth');


// Login with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
    failureMessage: "Failed to login with Google",
  }),
  googleAuth
);


router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, profile);

module.exports = router;