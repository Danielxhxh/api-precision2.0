var express = require("express");
const jwt = require("jsonwebtoken");
const ResultsController = require("../controllers/ResultsController");

var router = express.Router();

function verifyToken(req, res, next) {
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

router.post("/", verifyToken, ResultsController.postResults);
router.get("/:id", ResultsController.getPatientsResults);

module.exports = router;