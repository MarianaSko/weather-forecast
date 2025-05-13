import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../store';

const CityDetails = () => {
  const { cityName } = useParams();
  const weather = useSelector((state: RootState) => state.weather.citiesData[cityName ?? '']);

  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <h1>Details for {weather.city}</h1>
      <p>Temperature: {weather.temp}°C</p>
      <p>Description: {weather.description}</p>
    </div>
  );
};

export default CityDetails;
