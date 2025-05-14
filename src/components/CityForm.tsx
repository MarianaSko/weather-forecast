import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useCityAdder } from '../hooks/useCityAdder';

interface CityFormProps {
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
}

const CityForm: React.FC<CityFormProps> = ({ cities, setCities }) => {
  const [inputValue, setInputValue] = useState('');
  const { tryAddCity } = useCityAdder();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await tryAddCity(
      inputValue,
      cities,
      (city) => {
        setCities((prevCities) => [...prevCities, city]);
        setInputValue('');
      },
      (message) => {
        alert(message);
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 } }}>
        <TextField
          id="city-to-add"
          label="City name"
          autoComplete="off"
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: 8, sm: 10, md: 14 }, p: { xs: 1, sm: '6px 16px' } }}
        >
          Add city
        </Button>
      </Box>
    </form>
  );
};

export default CityForm;
