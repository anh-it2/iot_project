const express = require("express");
const controlRoutes = require("./routes/control.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", controlRoutes);

app.listen(PORT, () => {
  console.log(`HVAC rule-based controller running on port ${PORT}`);
});
