const Router = require("express");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { Pantry } = require("../db");
const router = Router();

module.exports = router;
router.post("/signup", adminMiddleware, async (req, res) => {
  const name = req.body.name;
  const contact = req.body.contact;
  const location = req.body.location;
  const isPresent = await Pantry.findOne({
    name,
    contact,
    location,
    isAssigned: false,
  });
  if (isPresent) {
    res.json({
      msg: "Staff already exists",
    });
  } else {
    const response = await Pantry.create({
      name,
      contact,
      location,
    });
    res.json({
      response,
    });
  }
});

router.get("/view", adminMiddleware, async (req, res) => {
  const response = await Pantry.find({});
  res.json({
    response,
  });
});

router.post("/assign/:pantryId", adminMiddleware, async (req, res) => {
  const pantryId = req.params.pantryId;
  const assignedMeal = req.body.assignedMeal;
  if (assignedMeal) {
    const pantryStaff = await Pantry.findById(pantryId);
    if (pantryStaff) {
      pantryStaff.isAssigned = true;
      pantryStaff.assignedMeal = assignedMeal;
      await pantryStaff.save();
      res.json({
        msg: "Meal assigned successfully",
      });
    } else {
      res.status(404).json({
        err: "Staff does not exist",
      });
    }
  } else {
    res.status(401).json({
      msg: "Invalid fields",
    });
  }
});
