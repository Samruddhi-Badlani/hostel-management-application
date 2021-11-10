const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("../passportAdmin");

initializePassport(passport);
router.get("/login", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("login_admin.ejs");
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/admins/dashboard",
      failureRedirect: "/admins/login",
      failureFlash: true,
    })
  );

  router.get("/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("admin_dashboard", { user: req.user, my_null_value: req.user.xyz });
  });
  router.get("/logout", (req, res) => {
    req.logout();
    res.render("index");
  });
  

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/admins/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/admins/login");
  }

  module.exports = router;