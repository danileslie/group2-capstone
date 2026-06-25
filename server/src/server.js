const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = require('./app');
const connectDB = require('./db/connection');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const shouldSkipDb =
      process.env.NODE_ENV === 'test' ||
      process.env.SKIP_DB_CONNECTION === 'true';

    if (shouldSkipDb) {
      console.log('Skipping MongoDB connection');
    } else {
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
