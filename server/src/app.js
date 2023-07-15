const express = require("express");
const cors = require("cors");
const path = require("path");

const weatherDataRouter = require("./routes/weatherData/weatherData.route");
const capitalsRouter = require("./routes/capitals/capitals.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use("/weather-data", weatherDataRouter);
app.use("/capitals", capitalsRouter);

app.get("/react-weather-wise*", (_req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

module.exports = app;
