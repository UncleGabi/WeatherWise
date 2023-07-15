let capitals = [];

const getCapitals = () => {
  return [...capitals];
};

const addCapitals = (fetchedCapitals) => {
  capitals = [...fetchedCapitals];
};

module.exports = {
  getCapitals,
  addCapitals,
};
