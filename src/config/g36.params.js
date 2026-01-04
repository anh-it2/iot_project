module.exports = {
  comfort: {
    DEFAULT_TEMP_SET: 26,     // °C
    DEFAULT_RH_SET: 60,       // %

    DEADBAND: 2,              // G36 yêu cầu deadband rõ
  },

  outdoor: {
    ECONOMIZER_MAX: 26,       // °C (free cooling)
    HEAT_ENABLE: 35,
  },

  humidity: {
    DRY_OFFSET: 1,            // làm lạnh sâu khi hút ẩm
  },
};
