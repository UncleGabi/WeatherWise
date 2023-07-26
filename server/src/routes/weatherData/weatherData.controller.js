const {
  getAllWeatherData,
  addWeatherData,
  getCityWeatherData,
  deleteWeatherdata,
} = require("../../models/weatherData.model");

async function httpGetAllData(_req, res) {
  const weatherData = await getAllWeatherData();
  return res.status(200).json(weatherData);
}

async function httpAddNewWeatherData(req, res) {
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

  await addWeatherData(weatherData);
  return res.status(201).json(weatherData);
}

async function httpDeleteWeatherData(req, res) {
  const { city } = req.params;
  const deletedWeatherData = getCityWeatherData(city);

  await deleteWeatherdata(city);
  return res.status(200).json(deletedWeatherData);
}

module.exports = {
  httpGetAllData,
  httpAddNewWeatherData,
  httpDeleteWeatherData,
};
