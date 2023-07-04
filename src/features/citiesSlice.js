import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_ID } from "../assets/app-id";

export const saveWeatherData = createAsyncThunk(
  "cities/saveWeatherData",
  async (cityName, thunkAPI) => {
    try {
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const response = await axios.get(url, {
        params: {
          q: cityName,
          APPID: APP_ID,
          units: "metric",
        },
      });

      const { data } = response;

      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        timeZone: data.timezone,
        time: data.dt,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        description: data.weather[0].description,
      };
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const handleAddCity = (state, action) => {
  const { payload } = action;
  state.isLoading = false;

  const isAddedCity =
    state.weatherData.findIndex((item) => item?.city === payload?.city) > -1;

  if (!isAddedCity) {
    state.weatherData = [...state.weatherData, payload];
  } else {
    state.weatherData.map((item) => {
      if (item?.city === payload?.city) {
        return payload;
      }

      return item;
    });
  }
};

const initialState = {
  weatherData: [],
  isLoading: false,
};
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveWeatherData.fulfilled, handleAddCity);
    builder.addCase(saveWeatherData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveWeatherData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectCapitalsData = (state) => state.citiesData.weatherData;
export const selectCityNames = (state) => {
  return state.citiesData.weatherData.map((item) => item?.city);
};
export const selectCurrentCity = (cityName) => (state) => {
  return state.citiesData.weatherData.find(
    (item) => item?.city.toLowerCase() === cityName.toLowerCase()
  );
};
export const selectAllData = (state) => state.citiesData;

export default citiesSlice.reducer;
