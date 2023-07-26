const mongoose = require("mongoose");

const weatherDetails = mongoose.Schema({
  city: String,
  temperature: Number,
  icon: String,
  timeZone: Number,
  time: Number,
  sunrise: Number,
  sunset: Number,
  description: String,
});

module.exports = mongoose.model("WeatherDetail", weatherDetails);
