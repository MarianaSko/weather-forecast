import React from 'react';

interface WeatherStateIconProps {
  iconCode: string;
  isBig?: boolean;
}

const WeatherStateIcon: React.FC<WeatherStateIconProps> = ({ iconCode, isBig }) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${iconCode}${isBig ? '@2x' : ''}.png`}
      alt="Sky state"
    />
  );
};

export default WeatherStateIcon;
