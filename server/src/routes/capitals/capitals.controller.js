const { getCapitals, addCapitals } = require("../../models/capitals.model");

async function httpGetCapitals(_req, res) {
  const allCapitals = await getCapitals();
  return res.status(200).json(allCapitals);
}

async function httpAddCapitals(req, res) {
  const capitals = req.body;

  if (!capitals.length) {
    return res.status(400).json({ error: "No capitals are given." });
  }

  await addCapitals(capitals);
  return res.status(201).json(capitals);
}

module.exports = {
  httpGetCapitals,
  httpAddCapitals,
};
