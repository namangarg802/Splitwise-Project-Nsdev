const express = require("express");

const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "namangargisaboy";
var fetchuser = require("../Middleware/fetchuser");
// Route 1:endpoint for crearting a user Post:/api/auth/createuser
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("mobileno", "Enter A valid 10 digit Mobile no").isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if any error return error and bad request status
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry user with this email already exist" });
      }
      // res.json(obj);
      // res.send(req.body)
      const salt = await bcrypt.genSalt(10);
      const securepass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securepass,
        mobileno: req.body.mobileno,
      });
      //   }).then(user => res.json(user))
      //   .catch((err)=>{console.log(err);
      // res.json("Email Id is already registered")
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = jwt.sign(data, JWT_SECRET);
      console.log(jwttoken);
      success = true;
      res.json({ success, jwttoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
// Route 2:endpoint for authenticate a user :Post "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if (errors) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please Enter correct Login credentials" });
      }
      if (user) {
        console.log("user exists");
        const Checkpassword = await bcrypt.compare(password, user.password);
        if (!Checkpassword) {
          success = false;
          return res.status(400).json({ success, error: "Incorrect Password" });
        }
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = jwt.sign(data, JWT_SECRET);
      success = true;
      console.log(jwttoken);
      res.json({ success, jwttoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
router.get("/fetchuser", fetchuser, async (req, res) => {
  try {
    const notes = await User.findOne({ _id: req.user.id });
    res.json(notes);
  } catch {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});
router.get("/fetchalluser", async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch {
    res.status(500).send("some error occured");
  }
});
router.post("/addfriend", fetchuser, async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { friend } = req.body;
  console.log(friend);
  try {
    const user = await User.findOne({ name: friend });

    if (!user) {
      return res
        .status(400)
        .json({ success, error: `No account exist with username ${friend}` });
    } else {
      success = true;
      const name = await User.findOne({ _id: req.user.id });
      name.friends.push(user.name);
      const namef = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $set: name },
        { new: false }
      );
      const name1 = await User.findOne({ _id: req.user.id });

      return res.json({ success, user, name1, friend });
    }
  } catch {
    res.status(500).send("some error occured");
  }
});
router.post("/addexpense", fetchuser, async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { balance, expenses, owe, owed } = req.body;
  try {
    success = true;
    const user = await User.findOne({ _id: req.user.id });
    user.balance = balance;
    user.expenses = expenses;
    user.owe = owe;
    user.owed = owed;
    const userf = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: user },
      { new: false }
    );
    const user3 = await User.findOne({ _id: req.user.id });
    return res.json({ success, user3 });
  } catch {
    res.status(500).send("some error occured please Check");
  }
});
module.exports = router;
