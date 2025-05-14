import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import CityForm from '../components/CityForm';
import WeatherCard from '../components/WeatherCard';

const LOCAL_STORAGE_KEY = 'weather_cities';

const WeatherDashboard: React.FC = () => {
  const [cities, setCities] = useLocalStorageState<string[]>(LOCAL_STORAGE_KEY, [
    'Kyiv',
    'Lviv',
    'Odesa',
    'New York',
  ]);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4, md: 6 }, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 } }}>
          Weather forecast
        </Typography>
        <CityForm cities={cities} setCities={setCities}></CityForm>
      </Box>
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          marginBottom: 4,
          justifyContent: 'center',
        }}
      >
        {!cities.length && <Typography variant="subtitle1">YOU HAVEN'T ADDED ANY CITY.</Typography>}
        {cities.map((city, id) => {
          return <WeatherCard key={id} city={city} cities={cities} setCities={setCities} />;
        })}
      </Box>
    </Box>
  );
};

export default WeatherDashboard;
