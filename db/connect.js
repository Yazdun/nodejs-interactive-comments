const mongoose = require("mongoose");

// DB Connection
const connectDB = (url) => {
  return mongoose.connect(url, {
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
