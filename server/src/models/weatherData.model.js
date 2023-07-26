const weatherData = require("./weatherData.mongo");
// const weatherData = new Map();

async function getAllWeatherData() {
  return await weatherData.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
  // return [...weatherData.values()];
}

async function getCityWeatherData(cityName) {
  return await weatherData.findOne({ city: cityName });
  // const cityData = weatherData.get(cityName);
  // return cityData;
}

async function addWeatherData(data) {
  await weatherData.updateOne(
    { city: data.city },
    { ...data },
    { upsert: true }
  );
  // weatherData.set(data.city, data);
}

async function deleteWeatherdata(city) {
  await weatherData.deleteOne({ city });
  // weatherData.delete(city);
}

module.exports = {
  getAllWeatherData,
  getCityWeatherData,
  addWeatherData,
  deleteWeatherdata,
};
