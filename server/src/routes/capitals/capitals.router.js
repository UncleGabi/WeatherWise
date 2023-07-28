const express = require("express");
const { httpGetCapitals } = require("./capitals.controller");

const capitalsRouter = express.Router();

capitalsRouter.get("/", httpGetCapitals);

module.exports = capitalsRouter;
