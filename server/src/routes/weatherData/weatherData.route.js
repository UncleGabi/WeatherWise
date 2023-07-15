const express = require("express");
const {
  httpGetAllData,
  httpAddNewWeatherData,
  httpDeleteWeatherData,
} = require("./weatherData.controller");

const weatherDataRouter = express.Router();

weatherDataRouter.get("/", httpGetAllData);
weatherDataRouter.post("/", httpAddNewWeatherData);
weatherDataRouter.delete("/:city", httpDeleteWeatherData);

module.exports = weatherDataRouter;
