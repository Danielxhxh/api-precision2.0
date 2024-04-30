var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  "first-name": { type: String, required: false },
  "last-name": { type: String, required: false },
  "birth-date": { type: String, required: true },
  height: {
    unit: { type: String, default: "centimeters" },
    value: { type: Number, required: true },
  },
  weight: {
    unit: { type: String, default: "kilograms" },
    value: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
