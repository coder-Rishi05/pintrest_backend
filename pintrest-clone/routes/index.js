
const express = require("express");
const router = express.Router();
const userModel = require("./users");
const Post = require("./posts");
const passport = require("passport");
const localStrategy = require("passport-local");

// Passport setup
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.post("/register", (req, res) => {
  const { userName, email, fullname } = req.body;
  const userData = new userModel({ userName, email, fullname });

  userModel.register(userData, req.body.password).then(() => {
    passport.authenticate("local")(req, res, function () {
      res.redirect("profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
