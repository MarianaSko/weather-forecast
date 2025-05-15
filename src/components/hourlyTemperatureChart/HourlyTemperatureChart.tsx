import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { ForecastAPIResponse } from '../../store';

interface HourlyTemperatureChartProps {
  forecast: ForecastAPIResponse;
}

const HourlyTemperatureChart = ({ forecast }: HourlyTemperatureChartProps) => {
  const today = new Date().toLocaleDateString('en-CA');
  console.log(today);

  const data = forecast.list
    .filter((item) => item.dt_txt.startsWith(today))
    .map((item): { time: string; temp: number } => ({
      time: `${new Date(item.dt_txt).getHours()}:00`,
      temp: Math.round(item.main.temp),
    }));

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="#1d272c">
        HOURLY FORECAST (TODAY)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1e3f67" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HourlyTemperatureChart;
