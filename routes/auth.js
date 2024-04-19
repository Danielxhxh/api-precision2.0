var express = require("express");
const AuthController = require("../controllers/AuthController");
var router = express.Router();

router.post("/token", AuthController.getToken);

module.exports = router;
