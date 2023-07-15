import { handleAddCity, addCapitalsReducer } from "./reducerFunctions";
import { fetchCapitals, fetchWeatherData } from "./thunkFunctions";

export const extraReducerFunctions = (builder) => {
  builder.addCase(fetchWeatherData.fulfilled, handleAddCity);
  builder.addCase(fetchWeatherData.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchWeatherData.rejected, (state) => {
    state.isLoading = false;
  });

  builder.addCase(fetchCapitals.fulfilled, addCapitalsReducer);
  builder.addCase(fetchCapitals.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchCapitals.rejected, (state) => {
    state.isLoading = false;
  });
};
