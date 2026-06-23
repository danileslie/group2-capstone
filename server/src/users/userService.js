const bcrypt = require('bcryptjs');

function registerUser({ email, password, name } = {}) {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const hashedPassword = bcrypt.hashSync(password, 10);

  return {
    name,
    email,
    hashedPassword,
  };
}

module.exports = { registerUser };
