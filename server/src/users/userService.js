const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');

async function registerUser({ email, password, name } = {}) {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, hashedPassword });

  return user;
}

async function loginUser({ email, password } = {}) {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token };
}

module.exports = { registerUser, loginUser };
