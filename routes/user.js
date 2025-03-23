const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const asyncWrap = require("../utils/AsyncWrap.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../midleware.js");
const userController = require("../controllers/users.js");

// SingUp
router.route("/signup")
.get(userController.signUpForm)
.post(asyncWrap(userController.signup));

// LogIn
router.route("/login")
.get(userController.loginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// For logout
router.get("/logout", userController.logOut);

module.exports = router;
