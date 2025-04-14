const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB has been connected SUCCESSFULLY ✅ :)');
  } catch (err) {
    console.error('MongoDB connection has FAILED :(', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;