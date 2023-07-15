import { createSlice } from "@reduxjs/toolkit";
import {
  addCapitalsReducer,
  updateWeatherReducer,
  deleteWeatherDataReducer,
} from "./reducerFunctions";
import { extraReducerFunctions } from "./extraReducerFunctions";

const initialState = {
  weatherData: [],
  capitals: [],
  isLoading: false,
};
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCapitals: addCapitalsReducer,
    updateWeatherData: updateWeatherReducer,
    deleteWeatherData: deleteWeatherDataReducer,
  },
  extraReducers: extraReducerFunctions,
});

export const selectAllCapitals = (state) => {
  return state.citiesData.capitals;
};
export const selectCityNames = (state) => {
  return state.citiesData.weatherData.map((item) => item?.city);
};
export const selectAllData = (state) => state.citiesData;

export default citiesSlice.reducer;

export const { addCapitals, updateWeatherData, deleteWeatherData } =
  citiesSlice.actions;
