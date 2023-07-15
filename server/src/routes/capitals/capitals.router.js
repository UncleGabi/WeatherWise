const express = require("express");
const { httpGetCapitals, httpAddCapitals } = require("./capitals.controller");

const capitalsRouter = express.Router();

capitalsRouter.get("/", httpGetCapitals);
capitalsRouter.post("/", httpAddCapitals);

module.exports = capitalsRouter;
