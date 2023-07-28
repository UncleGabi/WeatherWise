import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "cities/fetchWeatherData",
  async (cityName, thunkAPI) => {
    try {
      const APPID = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_ID;
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const response = await axios.get(url, {
        params: {
          q: cityName,
          APPID,
          units: "metric",
        },
      });

      const { data } = response;

      const weatherData = {
        city: data.name,
        temperature: Math.round(data.main.temp),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        timeZone: data.timezone,
        time: data.dt,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        description: data.weather[0].description,
      };

      await axios.post("http://localhost:8000/weather-data", weatherData);

      return weatherData;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchCapitals = createAsyncThunk(
  "cities/fetchCapitals",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:8000/capitals");
      return data[0].capitals;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
