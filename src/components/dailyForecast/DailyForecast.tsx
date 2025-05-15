import { Box, Typography, CardContent } from '@mui/material';
import WeatherStateIcon from '../WeatherStateIcon';
import CardElement from '../CardElement';
import type { ForecastAPIResponse } from '../../store';

interface DailyForecastProps {
  forecast: ForecastAPIResponse['list'];
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        5 DAYS FORECAST
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {forecast.map((item: ForecastAPIResponse['list'][number], id: number) => (
          <Box data-testid="daily-forecast-item" key={id}>
            <CardElement sx={{ padding: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1">
                    {new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
                  </Typography>
                  <WeatherStateIcon iconCode={item.weather[0].icon} isBig={true} />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'flex', sm: 'block' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>{Math.round(item.main.temp)}°C</Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: 8, sm: 12 }, opacity: '0.5' }}>
                    {item.weather[0].description.toUpperCase()}
                  </Typography>
                </Box>
              </CardContent>
            </CardElement>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DailyForecast;
