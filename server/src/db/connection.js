const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is missing. Add it to your .env file.');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);

  console.log('MongoDB connected');
  return mongoose.connection;
}

module.exports = connectDB;
