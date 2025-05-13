import { useDispatch } from 'react-redux';
import { fetchWeather } from '../store/weatherSlice';
import type { AppDispatch } from '../store';

export const useCityAdder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tryAddCity = async (
    cityName: string,
    existingCities: string[],
    onSuccess: (city: string) => void,
    onError: (msg: string) => void,
  ) => {
    const trimmed = cityName.trim();
    if (!trimmed) {
      onError('Please enter a city name');
      return;
    }

    const resultAction = await dispatch(fetchWeather(trimmed));

    if (fetchWeather.fulfilled.match(resultAction)) {
      const resultName = resultAction.payload.weatherData.name;

      if (existingCities.includes(resultName)) {
        onError('City is already in the list');
      } else {
        onSuccess(resultName);
      }
    } else {
      onError('City not found or API error');
    }
  };

  return { tryAddCity };
};
