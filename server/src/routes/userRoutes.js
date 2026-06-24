const express = require('express');
const router = express.Router();
const { registerUser } = require('../users/userService');

router.post('/register', (req, res) => {
  try {
    const user = registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
