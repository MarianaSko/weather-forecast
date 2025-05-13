import React from 'react';

interface WeatherStateIconProps {
  iconCode: string;
}

const WeatherStateIcon: React.FC<WeatherStateIconProps> = ({ iconCode }) => {
  return <img src={`https://openweathermap.org/img/wn/${iconCode}.png`} alt="Sky state" />;
};

export default WeatherStateIcon;
