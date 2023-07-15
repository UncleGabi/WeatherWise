const weatherData = new Map();

const getAllWeatherData = () => {
  return [...weatherData.values()];
};

const getCityWeatherData = (cityName) => {
  const cityData = weatherData.get(cityName);
  return cityData;
};

const addWeatherData = (data) => {
  weatherData.set(data.city, data);
};

const deleteWeatherdata = (city) => {
  weatherData.delete(city);
};

module.exports = {
  getAllWeatherData,
  getCityWeatherData,
  addWeatherData,
  deleteWeatherdata,
};
