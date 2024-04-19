const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create express app
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiRouter = require("./routes/api.js");

app.use("/api", apiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server running on http://localhost:${process.env.PORT || 3000}...`
  );
});
