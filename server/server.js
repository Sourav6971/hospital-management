const adminRouter = require("./Routes/admin");
const patientRouter = require("./Routes/patient");
const pantryRouter = require("./Routes/pantry");

const express = require("express");

const app = express();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/patient", patientRouter);
app.use("/pantry", pantryRouter);

app.listen(3000, () => {
  console.log(`app listening on port 3000`);
});
