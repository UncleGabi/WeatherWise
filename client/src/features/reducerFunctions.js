export const handleAddCity = (state, action) => {
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

export const updateWeatherReducer = (state, { payload }) => {
  state.weatherData = [...payload];
};

export const deleteWeatherDataReducer = (state, { payload }) => {
  state.weatherData = [...state.weatherData].filter(
    ({ city }) => city !== payload
  );
};

export const addCapitalsReducer = (state, { payload }) => {
  state.capitals = payload;
};
