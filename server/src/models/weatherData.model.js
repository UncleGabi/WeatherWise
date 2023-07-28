const weatherData = require("./weatherData.mongo");

async function getAllWeatherData() {
  return await weatherData.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function getCityWeatherData(cityName) {
  return await weatherData.findOne({ city: cityName });
}

async function addWeatherData(data) {
  await weatherData.updateOne(
    { city: data.city },
    { ...data },
    { upsert: true }
  );
}

async function deleteWeatherdata(city) {
  await weatherData.deleteOne({ city });
}

module.exports = {
  getAllWeatherData,
  getCityWeatherData,
  addWeatherData,
  deleteWeatherdata,
};
