import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchForecast, fetchWeather, useAppDispatch, type ForecastAPIResponse, type RootState } from '../store';
import HourlyTemperatureChart from '../components/HourlyTemperatureChart';
import DailyForecast from '../components/DailyForecast';
import WeatherStateIcon from '../components/WeatherStateIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CityDetails = () => {
  const { city } = useParams<{ city: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const weather = useSelector((state: RootState) => state.weather.citiesData[city ?? '']);
  const forecast: ForecastAPIResponse | null = useSelector(
    (state: RootState) => state.weather.forecastData[city ?? ''],
  );

  const lat = weather?.lat;
  const lon = weather?.lon;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    if (!weather) {
      dispatch(fetchWeather(city));
    }

    if (lat && lon) {
      dispatch(fetchForecast({ city, lat, lon }));
    }

    setIsLoading(false);
  }, [city, dispatch, weather, lat, lon]);

  if (!city) navigate('/');
  if (isLoading || !weather || !lat || !lon) return <CircularProgress />;

  const { temp, humidity, wind, iconCode, feelsLike } = weather;

  return (
    <>
      <ArrowBackIcon
        sx={{
          position: 'absolute',
          top: 48,
          left: 48,
          p: 1,
          margin: '0 auto',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.5,
            transform: 'scale(1.1)',
          },
        }}
        onClick={() => navigate('/')}
      ></ArrowBackIcon>
      <Box
        sx={{
          padding: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              {city}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <WeatherStateIcon iconCode={iconCode} isBig={true} />
              <Typography variant="h4" sx={{ marginLeft: 2 }}>
                {Math.round(temp)}°C
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Feels like {Math.round(feelsLike)}°C
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Humidity: {humidity}%
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Wind speed: {wind} kph
            </Typography>
          </Box>
          {forecast && <HourlyTemperatureChart forecast={forecast} />}
        </Box>
        {forecast && <DailyForecast forecast={forecast} />}
      </Box>
    </>
  );
};

export default CityDetails;
