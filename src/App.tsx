import { Routes, Route } from 'react-router-dom';
import WeatherDashboard from './pages/WeatherDashboard';
import CityDetails from './pages/CityDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherDashboard />} />
      <Route path="/:city" element={<CityDetails />} />
    </Routes>
  );
};

export default App;
