import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchForecast } from "./weatherThunks";
import type { WeatherState } from "./weatherTypes";

const initialState: WeatherState = {
  citiesData: {},
  citiesLoading: {},
  citiesError: {},
  forecastData: {},
  forecastLoading: {},
  forecastError: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        const city = action.meta.arg;
        state.citiesLoading[city] = true;
        state.citiesError[city] = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { weatherData } = action.payload;
        state.citiesData[weatherData.name] = {
          city: weatherData.name,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          iconCode: weatherData.weather[0].icon,
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon,
          wind: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          feelsLike: weatherData.main.feels_like,
        };
        state.citiesLoading[weatherData.name] = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        const city = action.meta.arg;
        state.citiesLoading[city] = false;
        state.citiesError[city] = action.payload || 'Error';
      })

      .addCase(fetchForecast.pending, (state, action) => {
        const city = action.meta.arg.city;
        state.forecastLoading[city] = true;
        state.forecastError[city] = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        const { city, forecast } = action.payload;
        state.forecastData[city] = forecast;
        state.forecastLoading[city] = false;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        const city = action.meta.arg.city;
        state.forecastLoading[city] = false;
        state.forecastError[city] = action.payload || 'Error';
      });
  },
});

export default weatherSlice.reducer;
