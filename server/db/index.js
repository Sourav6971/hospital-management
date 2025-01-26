require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });

const patientSchema = new mongoose.Schema({
  name: String,
  diseases: [String],
  allergies: [String],
  roomNumber: Number,
  bedNumber: Number,
  floorNumber: Number,
  age: Number,
  gender: String,
  contactNumber: String,
  emergencyContact: String,
  foodChart: {
    morning: String,
    evening: String,
    night: String,
    instructions: String,
  },
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const pantrySchema = new mongoose.Schema({
  name: String,
  contact: String,
  location: String,
  isAssigned: Boolean,
  assignedMeal: String,
});

const Patient = mongoose.model("Patient", patientSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Pantry = mongoose.model("Pantry", pantrySchema);
module.exports = { Patient, Admin, Pantry };
