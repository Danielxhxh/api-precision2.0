var express = require("express");
var authRouter = require("./auth");
var patientsRouter = require("./patients");
var resultsRouter = require("./results");

var app = express();

app.use("/auth/", authRouter);
app.use("/patient/", patientsRouter);
app.use("/results/", resultsRouter);

module.exports = app;
