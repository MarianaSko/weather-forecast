import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherService } from '../services/weatherService';

interface WeatherState {
  citiesData: {
    [city: string]: { city: string; temp: number; description: string; iconCode: string } | null;
  };
  citiesLoading: {
    [city: string]: boolean;
  };
  citiesError: {
    [city: string]: string | null;
  };
}

interface WeatherAPIResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

const initialState: WeatherState = {
  citiesData: {},
  citiesLoading: {},
  citiesError: {},
};

export const fetchWeather = createAsyncThunk<
  { weatherData: WeatherAPIResponse },
  string,
  { rejectValue: string }
>('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
  try {
    const weatherData = await weatherService.getCurrentWeather(city);
    return { weatherData };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue('Failed to fetch weather');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
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
        console.log(weatherData);

        state.citiesData[weatherData.name] = {
          city: weatherData.name,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          iconCode: weatherData.weather[0].icon,
        };
        state.citiesLoading[weatherData.name] = false;
        state.citiesError[weatherData.name] = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        const city = action.meta.arg;
        state.citiesLoading[city] = false;
        state.citiesError[city] = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
