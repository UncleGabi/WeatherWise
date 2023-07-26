const mongoose = require("mongoose");

const capitalsSchema = mongoose.Schema({
  capitals: [String],
});

module.exports = mongoose.model("Capital", capitalsSchema);
