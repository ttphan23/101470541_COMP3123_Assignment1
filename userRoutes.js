const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const router = express.Router();

router.post('/signup', async (req,res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  res.status(201).json({ message: "User created successfully.", user_id: user._id });
});

router.post('/login', async (req,res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne(email ? { email } : { username });
  if (!user) return res.status(401).json({ status:false, message: "Invalid Username and password" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ status:false, message: "Invalid Username and password" });

  const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:"1h" });
  res.json({ message:"Login successful.", jwt_token:token });
});

module.exports = router;
