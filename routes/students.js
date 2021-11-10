const express = require("express");
const router = express.Router();
const passport = require("passport");
var Passport = require('passport').Passport,
    passportAdmin = new Passport(),
    passportStudent = new Passport();

const pool = require("../db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("../passportStudent");

initializePassport(passportStudent);

router.get("/studentindex",checkAuthenticated,(req,res)=>{
  res.render("studentindex.ejs");
});
router.get("/register", checkAuthenticated, (req, res) => {
  res.render("register_student.ejs");
});
router.get("/login", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("login_student.ejs");
  });

  router.post("/register", async (req, res) => {
    let { name, email, password, password2 } = req.body;
  
    let errors = [];
  
    console.log({
      name,
      email,
      password,
      password2,
    });
  
    if (!name || !email || !password || !password2) {
      errors.push({ message: "Please enter all fields" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Password must be a least 6 characters long" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Passwords do not match" });
    }
  
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password, password2 });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      hashedPassword = password;
      console.log(hashedPassword);
      // Validation passed
      pool.query(
        `SELECT * FROM student_users
            WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            errors.push({ message: "Email already registered" });
            console.log("already registered   ", errors);
            return res.render("register", { errors });
          } else {
            pool.query(
              `INSERT INTO student_users (name, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING id, password`,
              [name, email, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/students/login");
              }
            );
          }
        }
      );
    }
  });

  router.post(
    "/login",
    passportStudent.authenticate("local", {
      
      successRedirect: "/students/dashboard",
      failureRedirect: "/students/login",
      failureFlash: true,
    })
    
  );

  router.get("/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("student_dashboard", { user: req.user, my_null_value: req.user.xyz });
  });
  router.get("/logout", (req, res) => {
    req.logout();
    res.render("index");
  });
  

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/students/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/students/login");
  }

  module.exports = router;