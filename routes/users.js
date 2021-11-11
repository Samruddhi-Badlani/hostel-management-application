const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("../passportConfig");

initializePassport(passport);

router.get("/students/studentindex",(req,res)=>{
  res.render("registerStudent.ejs");
})
router.get("/register", checkAuthenticated, (req, res) => {
  res.render("register.ejs");
});
router.get("/students/register", checkAuthenticated, (req, res) => {
  res.render("registerStudent.ejs");
});

router.get("/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("login.ejs");
});
router.get("/students/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("loginStudent.ejs");
});
router.get("/admins/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("loginAdmin.ejs");
});
router.get("/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user, my_null_value: req.user.xyz });
});
router.get("/students/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  pool.query("SELECT hostel_id,hostel_name FROM hostel",(err,result)=>{
    var hostels = [];
    for(i = 0 ; i < result.rows.length ; i++){
      var hostel ={
        hostel_id : result.rows[i].hostel_id,
        hostel_name : result.rows[i].hostel_name
      }
      hostels.push(hostel);
    }
    res.render("dashboardStudent", {user: req.user, my_null_value: req.user.xyz , hostels : hostels });
  })
  
});
router.get("/students/hostels",checkNotAuthenticated,(req,res)=>{
  pool.query("SELECT hostel_id,hostel_name FROM hostel",(err,result)=>{
    var hostels = [];
    for(i = 0 ; i < result.rows.length ; i++){
      var hostel ={
        hostel_id : result.rows[i].hostel_id,
        hostel_name : result.rows[i].hostel_name
       
      }

      hostels.push(hostel);
      console.log("Hostels are ",hostels);
      pool.query("SELECT * FROM room",(err,result_room)=>{
        var rooms = [];
        for(i = 0 ; i < result_room.rows.length ; i++){
          var room ={
            room_id : result_room.rows[i].room_id,
            rent_amount : result_room.rows[i].rent_amount,
            room_type : result_room.rows[i].room_type,
            hostel_id : result_room.rows[i].hostel_id
           
          }
    
          rooms.push(room);
          console.log("Rooms are ",rooms);
        }
        res.render("view_hostels", {user: req.user, my_null_value: req.user.xyz , hostels : hostels ,rooms:rooms});
      })
    }
    
  })
})
router.get("/admins/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboardAdmin", { user: req.user, my_null_value: req.user.xyz });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.render("index");
});

router.get("/students/logout", (req, res) => {
  req.logout();
  res.render("index");
});
router.get("/admins/logout", (req, res) => {
  req.logout();
  res.render("index");
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
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
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
            `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

router.post("/students/register", async (req, res) => {
  let { name, email, password, password2,rollNumber } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2,
    rollNumber
  });

  if (!name || !email || !password || !password2 || !rollNumber) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("registerStudent", { errors, name, email, password, password2,rollNumber });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
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
          return res.render("registerStudent", { errors });
        } else {
          pool.query("SELECT * FROM student WHERE student_id = $1",[rollNumber],(err,results_outer)=>{
            if (err) {
              throw err;
            }
            else{
              if(results_outer.rows.length > 0){
                pool.query(
                  `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`,
                  [name, email, hashedPassword],
                  (err, results) => {
                    if (err) {
                      throw err;
                    }
                    console.log(results.rows);
                    req.flash("success_msg", "You are now registered. Please log in");
                    res.redirect("/users/students/login");
                  }
                );
              }
              else{
                errors.push({ message: "Invalid Student roll number" });
          console.log("invalid student  ", errors);
          return res.render("registerStudent", { errors });
              }
              
            }
          })
          
        }
      }
    );
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
router.post(
  "/students/login",
  passport.authenticate("local", {
    successRedirect: "/users/students/dashboard",
    failureRedirect: "/users/students/login",
    failureFlash: true,
  })
);

router.post(
  "/admins/login",
  passport.authenticate("local", {
    successRedirect: "/users/admins/dashboard",
    failureRedirect: "/users/admins/login",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

router.post("/profile", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.body.myUserName);
  console.log(req.body.myUserEmail);
  console.log(req.body.myUserCity);
  console.log(req.body.myUserState);
  console.log(req.body.myUserCountry);
  console.log(req.body.myUserAddress);
  console.log(req.body.myUserJobRole);

  myUser = {
    id: req.body.myUserId,
    name: req.body.myUserName,
    email: req.body.myUserEmail,
    phone: req.body.myUserPhone,
    city: req.body.myUserCity,
    state: req.body.myUserState,
    country: req.body.myUserCountry,
    address: req.body.myUserAddress,
    jobRole: req.body.myUserJobRole,
    cost: req.body.myUserCost,
    capacity: req.body.myUserCapacity,
  };

  res.render("profile", { user: myUser });
});

router.post("/profileUpdate", checkNotAuthenticated, (req, res) => {
  console.log("I did fill form ", req.body.jobRole);
  myUser = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    address: req.body.address,
    jobRole: req.body.jobRole,
    cost: req.body.cost,
    capacity: req.body.capacity,
  };
  pool.query(
    "UPDATE users SET name=$1,email=$3,phone=$4,city=$5,state=$6,country=$7,address=$8,job_role=$9,cost=$10,capacity=$11 WHERE id=$2",
    [
      myUser.name,
      myUser.id,
      myUser.email,
      myUser.phone,
      myUser.city,
      myUser.state,
      myUser.country,
      myUser.address,
      myUser.jobRole,
      myUser.cost,
      myUser.capacity,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.render("dashboard", { user: myUser });
    }
  );
});

router.get("/contactlist", checkNotAuthenticated, (req, res) => {
  pool.query(`SELECT * FROM contactlist`, (err, results) => {
    if (err) {
      console.log(err);
    }
    // console.log(results.rows);
    res.render("contactlist", { data: results.rows });
  });
});

router.get("/feedback", checkNotAuthenticated, (req, res) => {
  // pool.query(`SELECT * FROM feedbacks`, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   // console.log(results.rows);
  //   res.render("feedback", { data: results.rows });
  // });
  console.log("Feed back router called");
  res.render("feedback");
});

router.post("/feedback",checkNotAuthenticated, (req, res) => {
  let { name, email, comment } = req.body;
  pool.query(
    `INSERT INTO feedbacks (name, email, comment)
          VALUES ($1, $2, $3)`,
    [name, email, comment],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      req.flash("admin: ", "Thanks for giving feedback! We value our customer");
      res.redirect("/users/dashboard");
    }
  );
});

module.exports = router;
