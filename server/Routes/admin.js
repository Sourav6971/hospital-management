const { Router } = require("express");
const { Admin } = require("../db/index");
const { Patient } = require("../db/index");
const adminMiddleware = require("../middlewares/adminMiddleware");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.JWT_SECRET;
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await Admin.findOne({
    username,
  });
  if (response) {
    res.json({
      msg: "Admin already exists",
    });
  } else {
    const newAdmin = await Admin.create({
      username,
      password,
    });
    res.status(200).json({
      newAdmin,
    });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const admin = Admin.findOne({
    username,
    password,
  });
  if (admin) {
    const token = jwt.sign({ username }, secret);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "Wrong email or password",
    });
  }
});
router.get("/patient/view", adminMiddleware, async (req, res) => {
  const response = await Patient.find({});
  res.json({
    response,
  });
});
router.post("patient/signup", adminMiddleware, async (req, res) => {
  const name = req.body.name;
  const diseases = req.body.diseases;
  const allergies = req.body.allergies;
  const roomNumber = req.body.roomNumber;
  const floorNumber = req.body.floorNumber;
  const bedNumber = req.body.bedNumber;
  const age = req.body.age;
  const gender = req.body.gender;
  const contactNumber = req.body.contactNumber;
  const emergencyContact = req.body.emergencyContact;
  const newPatient = await Patient.create({
    name,
    diseases,
    allergies,
    roomNumber,
    floorNumber,
    bedNumber,
    age,
    gender,
    contactNumber,
    emergencyContact,
  });
  res.status(200).json({
    newPatient,
  });
});

router.put("/patient/:patientId", adminMiddleware, async (req, res) => {
  const patientId = req.params.patientId;
  const patient = await Patient.findById(patientId);
  if (patient) {
    const morning = req.body.morning;
    const evening = req.body.evening;
    const night = req.body.night;
    const instructions = req.body.instructions;
    patient.foodChart.morning = morning;
    patient.foodChart.evening = evening;
    patient.foodChart.night = night;
    patient.foodChart.instructions = instructions;

    await patient.save();
    res.json({
      msg: "Patient details updated successfully",
    });
  } else {
    res.status(404).json({
      msg: "Patient does not exist",
    });
  }
});
module.exports = router;
