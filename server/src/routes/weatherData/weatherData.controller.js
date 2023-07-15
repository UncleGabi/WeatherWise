const {
  getAllWeatherData,
  addWeatherData,
  getCityWeatherData,
  deleteWeatherdata,
} = require("../../models/weatherData");

function httpGetAllData(_req, res) {
  return res.status(200).json(getAllWeatherData());
}

function httpAddNewWeatherData(req, res) {
  const weatherData = req.body;

  const missingProps = [
    "city",
    "temperature",
    "icon",
    "timeZone",
    "time",
    "sunrise",
    "sunset",
    "description",
  ].reduce((acc, curr) => {
    if (!weatherData[curr]) {
      acc.push(curr);
    }

    return acc;
  }, []);

  if (missingProps.length) {
    return res.status(400).json({
      error: `The following weather properties missing: ${missingProps.join(
        ", "
      )}.`,
    });
  }

  addWeatherData(weatherData);
  return res.status(201).json(weatherData);
}

function httpDeleteWeatherData(req, res) {
  const { city } = req.params;
  const deletedWeatherData = getCityWeatherData(city);

  deleteWeatherdata(city);
  return res.status(200).json(deletedWeatherData);
}

module.exports = {
  httpGetAllData,
  httpAddNewWeatherData,
  httpDeleteWeatherData,
};
