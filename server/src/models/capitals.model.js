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

async function addCapitals(fetchedCapitals) {
  await capitals.updateOne(
    {},
    { capitals: fetchedCapitals },
    { upsert: true },
    (err) => {
      if (err) {
        console.error(`Capitals could not be saved ${err}`);
      } else {
        console.log("Capitals saved successfully.");
      }
    }
  );
}

module.exports = {
  getCapitals,
  addCapitals,
};
