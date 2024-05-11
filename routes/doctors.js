var express = require("express");
var jwt = require("jsonwebtoken");
const DoctorController = require("../controllers/DoctorController");
var router = express.Router();

function verifyToken(req, res, next) {
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

router.post("/login", DoctorController.Login);
router.get("/verify-token", verifyToken, DoctorController.VerifyToken);
// router.post("/register", DoctorController.Register);

module.exports = router;
