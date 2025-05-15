import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WeatherCard from './WeatherCard';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  shallowEqual: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../services/weatherService');

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

describe('WeatherCard', () => {
  const defaultCity = 'Kyiv';
  const defaultCities = ['Kyiv'];

  const defaultSetCities = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: { [defaultCity]: undefined },
          citiesError: { [defaultCity]: undefined },
          citiesLoading: { [defaultCity]: true },
        },
      }),
    );

    render(<WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: { [defaultCity]: undefined },
          citiesError: { [defaultCity]: 'Failed to fetch' },
          citiesLoading: { [defaultCity]: false },
        },
      }),
    );

    render(<WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />);

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('renders weather data', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: {
            [defaultCity]: {
              city: 'Kyiv',
              temp: 20,
              iconCode: '01d',
              description: 'Clear',
            },
          },
          citiesError: { [defaultCity]: undefined },
          citiesLoading: { [defaultCity]: false },
        },
      }),
    );

    render(<WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />);

    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    expect(screen.getByText('CLEAR')).toBeInTheDocument(); // uppercase
  });

  it('calls navigate on card click', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: {
            [defaultCity]: {
              city: 'Kyiv',
              temp: 20,
              iconCode: '01d',
              description: 'Clear',
            },
          },
          citiesError: { [defaultCity]: undefined },
          citiesLoading: { [defaultCity]: false },
        },
      }),
    );

    const { container } = render(
      <WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />,
    );

    fireEvent.click(container.firstChild as HTMLElement);
    expect(mockNavigate).toHaveBeenCalledWith('/Kyiv');
  });

  it('calls dispatch on refresh click', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: {
            [defaultCity]: {
              city: 'Kyiv',
              temp: 20,
              iconCode: '01d',
              description: 'Clear',
            },
          },
          citiesError: { [defaultCity]: undefined },
          citiesLoading: { [defaultCity]: false },
        },
      }),
    );

    render(<WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />);

    const refreshIcon = screen.getByTestId('CachedIcon');
    fireEvent.click(refreshIcon);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('calls setCities on delete click', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        weather: {
          citiesData: {
            [defaultCity]: {
              city: 'Kyiv',
              temp: 20,
              iconCode: '01d',
              description: 'Clear',
            },
          },
          citiesError: { [defaultCity]: undefined },
          citiesLoading: { [defaultCity]: false },
        },
      }),
    );

    render(<WeatherCard city={defaultCity} cities={defaultCities} setCities={defaultSetCities} />);

    const deleteIcon = screen.getByTestId('DeleteOutlineIcon');
    fireEvent.click(deleteIcon);
    expect(defaultSetCities).toHaveBeenCalledWith([]);
  });
});
