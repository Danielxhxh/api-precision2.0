const Patient = require("../models/PatientModel.js");

require("dotenv").config();

// TODO: Remove password from the response and _id
exports.getPatient = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const patient = await Patient.findOne({ id: userId });

    res.status(200).json({ patient: patient, errorMessage: null });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

// TODO: Remove password from the response and _id
exports.getPatientID = async (req, res) => {
  try {
    const userId = req.params.id;
    const patient = await Patient.findOne({ id: userId });

    res.status(200).json({ patient: patient, errorMessage: null });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({ patients: patients, errorMessage: null });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

exports.addPatient = async (req, res) => {
  try {
    const {
      id,
      username,
      password,
      "first-name": firstName,
      "last-name": lastName,
      "birth-date": birthDate,
      weight,
      height,
    } = req.body;

    const patient = {
      id,
      username,
      password,
      "first-name": firstName,
      "last-name": lastName,
      "birth-date": birthDate,
      weight: {
        value: weight.value,
        unit: weight.unit,
      },
      height: {
        value: height.value,
        unit: height.unit,
      },
    };

    const newPatient = new Patient(patient);
    await newPatient.save();

    res.status(200).json({ patient: newPatient, errorMessage: null });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(400).json({ patient: null, errorMessage: "Bad Request" });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Check if the patient exists
    const patient = await Patient.findOne({ id: patientId });
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Patient not found", errorMessage: null });
    }

    await Patient.findOneAndDelete({ id: patientId });

    res
      .status(200)
      .json({
        message: `Patient with ID ${patientId} deleted successfully`,
        errorMessage: null,
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};
