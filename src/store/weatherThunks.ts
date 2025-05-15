import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ForecastAPIResponse, WeatherAPIResponse } from './weatherTypes';
import { weatherService } from '../services/weatherService';

export const fetchWeather = createAsyncThunk<
  { weatherData: WeatherAPIResponse },
  string,
  { rejectValue: string }
>('weather/fetchWeather', async (city, { rejectWithValue }) => {
  try {
    const weatherData = await weatherService.getCurrentWeather(city);
    return { weatherData };
  } catch {
    return rejectWithValue('Failed to fetch weather');
  }
});

export const fetchForecast = createAsyncThunk<
  { city: string; forecast: ForecastAPIResponse },
  { city: string; lat: number; lon: number },
  { rejectValue: string }
>('weather/fetchForecast', async ({ city, lat, lon }, { rejectWithValue }) => {
  try {
    const forecast = await weatherService.getHourlyForecast(lat, lon);
    return { city, forecast };
  } catch {
    return rejectWithValue('Failed to fetch forecast');
  }
});
