const express = require('express');
const passport = require('passport');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]


// HOME
router.get('/', (req, res, next) => {  res.render('index')})

//REGISTER
router.get ('/register', authMiddleware.isNotAuthenticated, authController.register)
router.post('/register', authMiddleware.isNotAuthenticated, authController.doRegister)

// LOG IN 
router.get ('/login', authMiddleware.isNotAuthenticated, authController.login)
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin)

// PROFILE
router.get('/profile', authMiddleware.isAuthenticated, usersController.profile)

// LOG OUT
router.get('/logout', authMiddleware.isAuthenticated, authController.logout)

//-------------------------------------------------------
// LOGIN GOOGLE
router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', authController.doLoginGoogle)

module.exports = router;