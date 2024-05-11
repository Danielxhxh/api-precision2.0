var express = require("express");
var authRouter = require("./auth");
var patientsRouter = require("./patients");
var resultsRouter = require("./results");
var doctorsRouter = require("./doctors");
var app = express();

app.use("/auth/", authRouter);
app.use("/patient/", patientsRouter);
app.use("/results/", resultsRouter);
app.use("/doctor/", doctorsRouter);

module.exports = app;
