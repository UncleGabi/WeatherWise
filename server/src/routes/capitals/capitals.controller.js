const { getCapitals } = require("../../models/capitals.model");

async function httpGetCapitals(_req, res) {
  const allCapitals = await getCapitals();
  return res.status(200).json(allCapitals);
}

module.exports = {
  httpGetCapitals,
};
