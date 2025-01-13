const { Router } = require("express");
const { Patient } = require("../db/index");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = Router();

router.post("/signup", async (req, res) => {
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
router.get("/view", adminMiddleware, async (req, res) => {
  const response = await Patient.find({});
  res.json({
    response,
  });
});

module.exports = router;
