const Router = require("express");
const router = Router();
const { Patient } = require("../db/index");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/view", adminMiddleware, async (req, res) => {
  const response = await Patient.find({});
  res.json({
    response,
  });
});
router.post("/signup", adminMiddleware, async (req, res) => {
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

router.put("/:patientId", adminMiddleware, async (req, res) => {
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
