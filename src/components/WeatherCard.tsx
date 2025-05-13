import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchWeather } from '../store/weatherSlice';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CachedIcon from '@mui/icons-material/Cached';
import WeatherStateIcon from './WeatherStateIcon';
import type { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface WeatherCardProps {
  city: string;
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, cities, setCities }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, loading } = useSelector(
    (state: RootState) => ({
      data: state.weather.citiesData[city],
      error: state.weather.citiesError[city],
      loading: state.weather.citiesLoading[city],
    }),
    shallowEqual,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!data && !loading && !error) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch, data, error, loading]);

  const handleCardClick = () => {
    navigate(`/city/${city}`);
  };
  const handleRefresh = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      dispatch(fetchWeather(city));
    },
    [dispatch, city],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      setCities(cities.filter((c) => c !== city));
    },
    [cities, city, setCities],
  );

  return (
    <Card
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        padding: 4,
        color: '#ced4dd',
        minWidth: '220px',
        minHeight: '162px',
        backgroundColor: '#1e3f67',
        boxShadow:
          ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2" fontSize={20}>
          {data?.city}
        </Typography>
        <DeleteOutlineIcon
          onClick={handleDelete}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.5,
              transform: 'scale(1.1)',
            },
          }}
        />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : data ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize={28}>{Math.round(data?.temp)}°C</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              <WeatherStateIcon iconCode={data.iconCode} />
              <Typography fontSize={8} sx={{ opacity: '0.5', alignSelf: 'end' }}>
                {data.description.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </>
      ) : null}

      <CachedIcon
        onClick={handleRefresh}
        sx={{
          p: 1,
          margin: '0 auto',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.5,
            transform: 'scale(1.1)',
          },
        }}
      />
    </Card>
  );
};

export default React.memo(WeatherCard);
