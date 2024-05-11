var express = require("express");
const jwt = require("jsonwebtoken");
const PatientsController = require("../controllers/PatientsController");

var router = express.Router();

function verifyTokenUser(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

function verifyTokenDoctor(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (decoded.id !== "doctor") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.get("/", verifyTokenUser, PatientsController.getPatient);
router.get("/:id", verifyTokenDoctor, PatientsController.getPatientID);
router.get("/id/all", verifyTokenDoctor, PatientsController.getAllPatients);
router.post("/", verifyTokenDoctor, PatientsController.addPatient);

module.exports = router;
