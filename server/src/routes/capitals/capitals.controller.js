const { getCapitals, addCapitals } = require("../../models/capitals");

function httpGetCapitals(_req, res) {
  return res.status(200).json(getCapitals());
}

function httpAddCapitals(req, res) {
  const capitals = req.body;

  if (!capitals.length) {
    return res.status(400).json({ error: "No capitals are given." });
  }

  addCapitals(capitals);
  return res.status(201).json(capitals);
}

module.exports = {
  httpGetCapitals,
  httpAddCapitals,
};
