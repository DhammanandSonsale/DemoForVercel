const User = require("../models/user.js");

// SignUp
module.exports.signUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

// SignUp User updation
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerdUSer = await User.register(newUser, password);
    console.log(registerdUSer);

    req.login(registerdUSer, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// LogIn
module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
  console.log("WORKING!");
};

// Login user
module.exports.login = async (req, res) => {
  console.log(req.user);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout
module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
