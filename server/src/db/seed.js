require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const mongoose = require('mongoose');
const connectDB = require('./connection');

(async () => {
  await connectDB();

  // TODO: insert seed data here, e.g.:
  // await User.deleteMany({});
  // await User.insertMany([...]);

  console.log('Seed complete.');
  await mongoose.disconnect();
})();
