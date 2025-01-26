const adminRouter = require("./Routes/admin");

const express = require("express");

const app = express();
app.use(express.json());

app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log(`app listening on port 3000`);
});
