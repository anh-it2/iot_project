const express = require("express");
const { g36Control } = require("../controller/g36Controller");

const router = express.Router();

router.post("/control", (req, res) => {
  const {
    T_room,
    RH_room,
    T_outdoor,
    userTempSet,
    userRHSet,
  } = req.body;

  if (
    T_room == null ||
    RH_room == null ||
    T_outdoor == null
  ) {
    return res.status(400).json({
      message:
        "T_room, RH_room, T_outdoor are required",
    });
  }

  const result = g36Control({
    T_room,
    RH_room,
    T_outdoor,
    userTempSet,
    userRHSet,
  });

  res.json({
    input: req.body,
    output: result,
  });
});

module.exports = router;
