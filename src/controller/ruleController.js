const thresholds = require("../config/thresholds");

function ruleBasedControl({
  tempIndoor,
  tempOutdoor,
  humidity,
  userSetTemp, // OPTIONAL
}) {
  let mode = "FAN";
  let targetTemperature;
  let reason = "";

  // ===== 1. XÁC ĐỊNH BASE TEMPERATURE =====
  const baseTemp =
    typeof userSetTemp === "number"
      ? userSetTemp
      : thresholds.temperature.AUTO_TARGET;

  // ===== 2. TÍNH BÙ CẢM NHẬN (PERCEIVED HEAT) =====
  let compensation = 0;

  if (humidity > thresholds.humidity.VERY_HUMID) {
    compensation += thresholds.compensation.HUMIDITY;
  }

  if (tempOutdoor > thresholds.temperature.VERY_HOT_OUTDOOR) {
    compensation += thresholds.compensation.OUTDOOR;
  }

  if (tempOutdoor < thresholds.temperature.VERY_COLD_OUTDOOR) {
    compensation -= thresholds.compensation.OUTDOOR;
  }

  // ===== 3. TARGET TEMPERATURE (NHIỆT ĐỘ MÁY) =====
  targetTemperature = baseTemp - compensation;

  // ===== 4. ƯU TIÊN ĐỘ ẨM =====
  if (humidity > thresholds.humidity.DRY_ON) {
    mode = "DRY";
    reason = "High humidity";
    return {
      mode,
      targetTemperature,
      reason,
      auto: userSetTemp == null,
    };
  }

  // ===== 5. ĐIỀU KHIỂN NHIỆT ĐỘ =====
  if (tempIndoor > baseTemp + thresholds.deadband) {
    mode = "COOL";
    reason = "Room hotter than desired";
  } else if (tempIndoor < baseTemp - thresholds.deadband) {
    mode = "HEAT";
    reason = "Room colder than desired";
  } else {
    mode = "FAN";
    targetTemperature = null;
    reason = "Comfortable zone";
  }

  return {
    mode,
    targetTemperature,
    reason,
    auto: userSetTemp == null,
  };
}

module.exports = {
  ruleBasedControl,
};
