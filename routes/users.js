const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("../passportConfig");

initializePassport(passport);

router.get("/students/studentindex", (req, res) => {
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
  pool.query("SELECT hostel_id,hostel_name FROM hostel", (err, result) => {
    var hostels = [];
    for (i = 0; i < result.rows.length; i++) {
      var hostel = {
        hostel_id: result.rows[i].hostel_id,
        hostel_name: result.rows[i].hostel_name
      }
      hostels.push(hostel);
    }
    const studentID = req.user.id;
    console.log(studentID, " is studnet id");
    var student;
    pool.query(`SELECT * FROM student WHERE user_id = $1`, [studentID], (error1, results1) => {
      console.log(results1.rows);
      student = {
        id: results1.rows[0].student_id,
        name: results1.rows[0].fname,
        phone: results1.rows[0].phone_no,
        gender: results1.rows[0].gender
      }
      console.log("Student dashboard called student object passed= ", student);
      res.render("dashboardStudent", { user: student, my_null_value: req.user.xyz, hostels: hostels, profileView: false });
    })

  })

});
router.post("/students/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  pool.query("SELECT hostel_id,hostel_name FROM hostel", (err, result) => {
    var hostels = [];
    for (i = 0; i < result.rows.length; i++) {
      var hostel = {
        hostel_id: result.rows[i].hostel_id,
        hostel_name: result.rows[i].hostel_name
      }
      hostels.push(hostel);
    }
    const studentID = req.user.id;
    console.log(studentID, " is studnet id");
    var student;
    pool.query(`SELECT * FROM student WHERE user_id = $1`, [studentID], (error1, results1) => {
      console.log(results1.rows);
      student = {
        id: results1.rows[0].student_id,
        name: results1.rows[0].fname,
        phone: results1.rows[0].phone_no,
        gender: results1.rows[0].gender
      }
      console.log("Student dashboard called student object passed= ", student);
      res.render("dashboardStudent", { user: student, my_null_value: req.user.xyz, hostels: hostels, profileView: req.body.profileView });
    })

  })

});
router.get("/students/hostels", checkNotAuthenticated, (req, res) => {
  pool.query("SELECT hostel_id,hostel_name FROM hostel", (err, result) => {
    var hostels = [];
    for (i = 0; i < result.rows.length; i++) {
      var hostel = {
        hostel_id: result.rows[i].hostel_id,
        hostel_name: result.rows[i].hostel_name

      }

      hostels.push(hostel);
      console.log("Hostels are ", hostels);
      pool.query("SELECT * FROM room", (err, result_room) => {
        var rooms = [];
        for (i = 0; i < result_room.rows.length; i++) {
          var room = {
            room_id: result_room.rows[i].room_id,
            rent_amount: result_room.rows[i].rent_amount,
            room_type: result_room.rows[i].room_type,
            hostel_id: result_room.rows[i].hostel_id

          }

          rooms.push(room);
          console.log("Rooms are ", rooms);
        }
        res.render("view_hostels", { user: req.user, my_null_value: req.user.xyz, hostels: hostels, rooms: rooms });
      })
    }

  })
})
router.get("/admins/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  pool.query(`SELECT * FROM administrator where user_id=$1`, [req.user.id], (err, results) => {
    var admin = {
      id: results.rows[0].admin_id,
      name: results.rows[0].fname + results.rows[0].lname,
      phone: results.rows[0].phone_no
    }
    console.log("admin dashboard passed this object", admin)
    res.render("dashboardAdmin", { user: admin, my_null_value: req.user.xyz });
  })

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
  let { name, email, password, password2, rollNumber } = req.body;

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
    res.render("registerStudent", { errors, name, email, password, password2, rollNumber });
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
          pool.query(
            `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              var studentId = results.rows[0].id;
              pool.query(
                `INSERT INTO student (user_id,student_id,fname)
                      VALUES ($1, $2,$3)
                      RETURNING student_id`, [studentId, rollNumber, name], (err2, resultsFinal) => {

                if (err2) {
                  console.log(err2)
                }
                console.log(results.rows);
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/users/students/login");
              })

            }
          );

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
  res.redirect("/");
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
router.post("/students/profile", checkNotAuthenticated, (req, res) => {
  var studentID = req.user.id;
  pool.query(`SELECT * FROM student WHERE user_id = $1`, [studentID], (error1, results1) => {
    console.log(results1.rows);
    student = {
      id: results1.rows[0].student_id,
      name: results1.rows[0].fname,
      phone: results1.rows[0].phone_no,
      gender: results1.rows[0].gender
    }
    console.log("Profile called student object passed = ", student);
    res.render("profileStudent", { user: student });
  })

});

router.post("/students/profileUpdate", checkNotAuthenticated, (req, res) => {
  console.log("Student profile updated ");
  student = {
    id: req.body.id,
    name: req.body.name,

    phone: req.body.phone,
    gender: req.body.gender
  }
  if (req.body.gender == 'male') {
    student.gender = 'M';
  }
  else {
    student.gender = 'F';
  }
  pool.query(
    `UPDATE student SET phone_no = $1,gender = $3 WHERE student_id= $2`,
    [student.phone, student.id, student.gender], (err, result) => {
      res.redirect("/users/students/dashboard");
    })
})
router.post("/admins/profile", checkNotAuthenticated, (req, res) => {
  var adminID = req.user.id;
  console.log("admin of user id called  == ", adminID)
  pool.query(`SELECT * FROM administrator WHERE user_id = $1`, [adminID], (error1, results1) => {
    if (error1) {
      console.log(error1);
    }
    console.log(results1.rows);
    admin = {
      id: results1.rows[0].admin_id,
      name: results1.rows[0].fname + results1.rows[0].lname,
      phone: results1.rows[0].phone_no,

    }
    console.log("Profile called admin  object passed = ", admin);
    res.render("profileAdmin", { user: admin });
  })

});
router.post("/admins/profileUpdate", checkNotAuthenticated, (req, res) => {
  console.log("admin profile updated ");
  admin = {
    id: req.body.id,
    name: req.body.name,

    phone: req.body.phone,

  }

  pool.query(
    `UPDATE administrator SET phone_no = $1 where admin_id= $2`,
    [admin.phone, admin.id], (err, result) => {
      res.redirect("/users/admins/dashboard");
    })
})
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

router.post("/feedback", checkNotAuthenticated, (req, res) => {
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


router.post("/students/hostelStudent", (req, res) => {
  var studentID = req.user.id;
  pool.query(`SELECT * FROM student WHERE user_id = $1`, [studentID], (error1, results1) => {
    console.log(results1.rows);
    student = {
      id: results1.rows[0].student_id,
      name: results1.rows[0].fname,
      phone: results1.rows[0].phone_no,
      gender: results1.rows[0].gender
    }

    pool.query(`SELECT * FROM hostel `, (err2, results2) => {
      var hostels = [];
      for (var i = 0; i < results2.rows.length; i++) {
        hostel = {
          id: results2.rows[i].hostel_id,
          name: results2.rows[i].hostel_name,
          no_of_rooms: results2.rows[i].no_of_rooms
        }
        hostels.push(hostel);
      }
      console.log("Profile called student object passed = ", student);
      res.render("hostelStudent", { user: student, hostels: hostels });
    })

  })
})
router.post("/admins/hostelStudent", (req, res) => {
  var adminID = req.user.id;
  pool.query(`SELECT * FROM administrator WHERE user_id = $1`, [adminID], (error1, results1) => {
    console.log(results1.rows);
    admin = {
      id: results1.rows[0].admin_id,
      name: results1.rows[0].fname + results1.rows[0].lname,
      phone: results1.rows[0].phone_no,

    }

    pool.query(`SELECT * FROM hostel `, (err2, results2) => {
      var hostels = [];
      for (var i = 0; i < results2.rows.length; i++) {
        hostel = {
          id: results2.rows[i].hostel_id,
          name: results2.rows[i].hostel_name,
          no_of_rooms: results2.rows[i].no_of_rooms
        }
        hostels.push(hostel);
      }
      console.log("view hostels  called for admin object passed = ", admin);
      res.render("hostelAdmin", { user: admin, hostels: hostels });
    })

  })
})

router.post("/admins/addHostel", (req, res) => {
  console.log(req.isAuthenticated());
  pool.query(`SELECT * FROM administrator where user_id=$1`, [req.user.id], (err, results) => {
    var admin = {
      id: results.rows[0].admin_id,
      name: results.rows[0].fname + results.rows[0].lname,
      phone: results.rows[0].phone_no
    }
    console.log("admin add hostel called passed this object", admin)
    res.render("addHostel", { user: admin, my_null_value: req.user.xyz });
  })
})
router.post("/admins/addHostelByAdmin", (req, res) => {
  console.log(req.isAuthenticated());

  var hostel = {
    name: req.body.myHostelName,
    phone: req.body.myHostelPhone,
    rooms: req.body.myHostelRooms,
    admin_id: req.body.myUserId,
    hostel_id: req.body.myHostelID
  }
  pool.query(`INSERT INTO hostel(hostel_name,phone_no,no_of_rooms,admin_id,hostel_id) VALUES ($1,$2,$3,$4,$5)`,
    [hostel.name, hostel.phone, hostel.rooms, hostel.admin_id, hostel.hostel_id], (err1, results1) => {
      if (err1) {
        console.log(err1);
      }
      else {
        console.log("Inserted successfully   ");
      }
      res.redirect("/users/admins/dashboard");
    })
})

router.post("/admins/addStaff", (req, res) => {
  console.log(req.isAuthenticated());
  pool.query(`SELECT * FROM administrator where user_id=$1`, [req.user.id], (err, results) => {
    var admin = {
      id: results.rows[0].admin_id,
      name: results.rows[0].fname + results.rows[0].lname,
      phone: results.rows[0].phone_no
    }
    console.log("admin add staff called passed this object", admin)
    res.render("addStaff", { user: admin, my_null_value: req.user.xyz });
  })
})


router.post("/admins/addStaffByAdmin", (req, res) => {
  console.log(req.isAuthenticated());
  console.log("Admin is adding a staff member here!!")
  var staff = {
    staff_id: req.body.myStaffID,
    staff_name: req.body.myStaffName,
    contact_number: req.body.myStaffPhone,
    gender: req.body.myStaffGender,
    salary: req.body.myStaffSalary,
    job_role: req.body.myStaffRole,
    hostel_id: req.body.myStaffHostel
  }
  pool.query(`INSERT INTO staff(staff_id,staff_name,contact_number,gender,salary,job_role,hostel_id) 
              VALUES ($1,$2,$3,$4,$5,$6,$7)`, [staff.staff_id, staff.staff_name, staff.contact_number, staff.gender, staff.salary, staff.job_role, staff.hostel_id],
    (err1, results1) => {
      if(err1){
        console.log(err1)
      }
      else{
        console.log("Staff added successfully");
      }
      res.redirect("/users/admins/dashboard");

    })
})
module.exports = router;
