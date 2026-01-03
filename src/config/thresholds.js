module.exports = {
  temperature: {
    HOT: 30,
    COLD: 20,
    VERY_HOT_OUTDOOR: 35,
    VERY_COLD_OUTDOOR: 18,
    AUTO_TARGET: 26, // khi user không nhập
  },

  humidity: {
    DRY_ON: 65,
    VERY_HUMID: 75,
  },

  compensation: {
    HUMIDITY: 1,
    OUTDOOR: 1,
  },

  deadband: 1, // ±1°C
};
