var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
