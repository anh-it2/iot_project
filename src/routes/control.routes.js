const express = require("express");
const { ruleBasedControl } = require("../controller/ruleController");

const router = express.Router();

router.post("/control", (req, res) => {
  const {
    tempIndoor,
    tempOutdoor,
    humidity,
    userSetTemp,
  } = req.body;

  if (
    tempIndoor == null ||
    tempOutdoor == null ||
    humidity == null
  ) {
    return res.status(400).json({
      message:
        "tempIndoor, tempOutdoor and humidity are required",
    });
  }

  const result = ruleBasedControl({
    tempIndoor,
    tempOutdoor,
    humidity,
    userSetTemp,
  });

  return res.json({
    input: {
      tempIndoor,
      tempOutdoor,
      humidity,
      userSetTemp,
    },
    output: result,
  });
});

module.exports = router;
