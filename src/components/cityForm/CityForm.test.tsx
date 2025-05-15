/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CityForm from './CityForm';
import { useCityAdder } from '../../hooks/useCityAdder';

jest.mock('../../hooks/useCityAdder');
jest.mock('../../services/weatherService');

const mockTryAddCity = jest.fn();
(useCityAdder as jest.Mock).mockReturnValue({
  tryAddCity: mockTryAddCity,
});

describe('CityForm', () => {
  let setCities: jest.Mock;
  let cities: string[];

  beforeEach(() => {
    setCities = jest.fn();
    cities = ['Kyiv'];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<CityForm cities={cities} setCities={setCities} />);
    expect(screen.getByLabelText(/city name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add city/i })).toBeInTheDocument();
  });

  it('calls tryAddCity on submit with correct arguments', async () => {
    render(<CityForm cities={cities} setCities={setCities} />);

    const input = screen.getByLabelText(/city name/i);
    const button = screen.getByRole('button', { name: /add city/i });

    fireEvent.change(input, { target: { value: 'Lviv' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockTryAddCity).toHaveBeenCalledWith(
        'Lviv',
        cities,
        expect.any(Function),
        expect.any(Function),
      );
    });
  });

  it('adds city and clears input on success', async () => {
    render(<CityForm cities={cities} setCities={setCities} />);

    const input = screen.getByLabelText(/city name/i);
    const button = screen.getByRole('button', { name: /add city/i });

    fireEvent.change(input, { target: { value: 'Odesa' } });

    const onSuccess = jest.fn();
    const onError = jest.fn();

    // Імітуємо, що tryAddCity викликає onSuccess
    mockTryAddCity.mockImplementation((city, cities, onSuccess, onError) => {
      onSuccess(city);
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(setCities).toHaveBeenCalledWith(expect.arrayContaining(['Odesa']));
    });

    // Перевірка, що інпут очистився
    expect(input).toHaveValue('');
  });

  it('alerts on error', async () => {
    window.alert = jest.fn();
    render(<CityForm cities={cities} setCities={setCities} />);

    const input = screen.getByLabelText(/city name/i);
    const button = screen.getByRole('button', { name: /add city/i });

    fireEvent.change(input, { target: { value: 'InvalidCity' } });

    mockTryAddCity.mockImplementation((city, cities, onSuccess, onError) => {
      onError('City not found');
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('City not found');
    });
  });
});
