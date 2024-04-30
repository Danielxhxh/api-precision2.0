const jwt = require("jsonwebtoken");
const Patient = require("../models/PatientModel.js");
require("dotenv").config();

exports.getToken = async (req, res) => {
  try {
    let { username, password } = req.body;
    let userId = NaN;

    const patient = await Patient.findOne({ username, password });

    if (!patient) {
      res.status(400).send("Error: Invalid username or password");
      return;
    }

    authenticated = true;
    userId = patient.id;

    const accessToken = jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      accessToken: accessToken,
      tokenType: "Bearer",
      refreshToken: refreshToken,
      expiresIn: 3600, // 1 hour in seconds
    });
  } catch {
    res.status(400).send("Error");
  }
};
