const mongoose = require('mongoose');

// Use the MONGO_URL from the environment variables
const mongoUrl = process.env.MONGO_URL; 

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", (err) => {
  if (err) {
    console.log("DB not connected");
  } else {
    console.log("DB connected");
  }
});

module.exports = db;
