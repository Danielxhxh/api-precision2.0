const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Doctor = require("../models/DoctorModel.js");
require("dotenv").config();

exports.Login = async (req, res) => {
  try {
    let { username, password } = req.body;

    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(400).send("Error: Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(400).send("Error: Invalid username or password");
    }

    const accessToken = jwt.sign({ id: "doctor" }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: "doctor" },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      accessToken: accessToken,
      tokenType: "Bearer",
      refreshToken: refreshToken,
      expiresIn: 3600, // 1 hour in seconds
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

exports.Register = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Check if the username already exists
    const existingDoctor = await Doctor.findOne({ username });

    if (existingDoctor) {
      return res.status(400).send("Error: Username already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor
    const newDoctor = new Doctor({
      username: username,
      password: hashedPassword,
    });

    // Save the new doctor to the database
    await newDoctor.save();

    // Generate tokens
    const accessToken = jwt.sign({ id: "doctor" }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: "doctor" },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      accessToken: accessToken,
      tokenType: "Bearer",
      refreshToken: refreshToken,
      expiresIn: 3600, // 1 hour in seconds
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

exports.VerifyToken = async (req, res) => {
  res.json({ valid: true });
};
