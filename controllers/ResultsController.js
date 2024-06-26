const fs = require("fs");
const Result = require("../models/ResultModel.js");

require("dotenv").config();

exports.postResults = async (req, res) => {
  try {
    const result = req.body;

    // Only for tests. Remove this line when the frontend is ready.
    // result.patient = { id: req.decoded.id };

    const newResult = new Result(result);
    await newResult.save();

    res.status(200).json({
      areResultsSaved: true,
      error: null,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.getPatientsResults = async (req, res) => {
  try {
    const patientId = req.params.id;
    // const results = await Result.find({ "patient.id": patientId });

    const allResults = await Result.find();
    let results = []; // Array of results for the patient with the given id

    allResults.forEach((result) => {
      for (const key in result) {
        if (
          result[key] &&
          result[key].patient &&
          result[key].patient.id === patientId
        ) {
          results.push(result[key]);
        }
      }
    });

    if (results.length === 0) {
      res.status(404).json({
        results: [],
        error: "No results found",
      });
    } else {
      res.status(200).json({
        results,
        errorMessage: null,
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
