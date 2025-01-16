const express = require("express");
const router = express.Router();
const { User, Course, Enrollment } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const token = jwt.sign({ userId: user._id }, "your-secret-key");

  res.json(token)
});

module.exports = router;
