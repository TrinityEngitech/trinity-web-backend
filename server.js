const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Set to Google or Cloudflare DNS


require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000; // Use the PORT fr`  om the environment variables
const mongoUrl = process.env.MONGO_URL; // MongoDB connection URL

// MongoDB Connection
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

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./Routes/route"));

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port " + port);
  }
});

module.exports = app;
