const bcrypt = require('bcryptjs');
const User = require('./User');

async function registerUser({ email, password, name } = {}) {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, hashedPassword });

  return user;
}

module.exports = { registerUser };
