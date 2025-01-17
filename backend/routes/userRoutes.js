const express = require("express");
const router = express.Router();
const { User, Course, Enrollment } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAdmin = require('../middlewares/admin');

router.get("/", isAdmin, async (req, res) => {
  const users = await User.find({});

  //add enrolled courses using ref properties of different model
  res.send(users);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "student";

  // console.log(req.headers.username)
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(401).send("user not found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "your-secret-key"
  );

  res.json({ token });
});

router.delete("/:userId", async (req, res)=>{
  await User.deleteOne({_id:req.params.userId});

  // User.remove({ _id: req.params.userId })
  res.send("deleted")
})

module.exports = router;
