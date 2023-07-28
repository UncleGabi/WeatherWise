const axios = require("axios");
const capitals = require("./capitals.mongo");

async function getCapitals() {
  return await capitals.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function fetchCapitals() {
  const savedCapitals = await capitals.find({});

  if (savedCapitals.length) {
    console.log("Capital data are already loaded!");
  } else {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    const fetchedCapitals = data.flatMap((item) => item.capital);

    await capitals.updateOne(
      {},
      { capitals: fetchedCapitals },
      { upsert: true }
    );
  }
}

module.exports = {
  getCapitals,
  fetchCapitals,
};
