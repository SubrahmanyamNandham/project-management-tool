const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/signup', async (req, res) => {
  let parsedBody;

  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('text/plain')) {
    try {
      const cleanedInput = req.body.trim();
      console.log('Attempting to parse:', cleanedInput);
      parsedBody = JSON.parse(cleanedInput);
    } catch (err) {
      console.log('JSON parse failed:', err.message);
      console.log('Input was:', req.body);
      return res.status(400).json({
        message: 'Invalid JSON format in request body',
        error: err.message,
        hint: 'Check for extra commas, missing quotes, or malformed JSON'
      });
    }
  } else {
    parsedBody = req.body;
  }

  if (!parsedBody || Object.keys(parsedBody).length === 0) {
    return res.status(400).json({ message: 'Request body is required' });
  }

  const { email, password, role } = parsedBody;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role: role || 'user' });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token,
      user: { email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean(); // .lean() returns plain JS object

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;
