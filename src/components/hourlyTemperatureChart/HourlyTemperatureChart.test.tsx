import { render, screen } from '@testing-library/react';
import HourlyTemperatureChart from './HourlyTemperatureChart';
import type { ForecastAPIResponse } from '../../store';
import '@testing-library/jest-dom';

const mockForecast: ForecastAPIResponse = {
  list: [
    {
      dt: 1715594400,
      dt_txt: new Date().toISOString().split('T')[0] + ' 12:00:00',
      main: { temp: 21 },
      weather: [{ description: 'Clear', icon: '01d' }],
    },
    {
      dt: 1715598000,
      dt_txt: new Date().toISOString().split('T')[0] + ' 15:00:00',
      main: { temp: 23 },
      weather: [{ description: 'Sunny', icon: '01d' }],
    },
  ],
};

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('HourlyTemperatureChart', () => {
  it('renders chart title', () => {
    render(<HourlyTemperatureChart forecast={mockForecast} />);
    expect(screen.getByText(/HOURLY FORECAST \(TODAY\)/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<HourlyTemperatureChart forecast={mockForecast} />);
    expect(container).toMatchSnapshot();
  });

  it('renders without crashing even if city is missing', () => {
    const noCityForecast = { ...mockForecast, city: undefined };
    render(<HourlyTemperatureChart forecast={noCityForecast} />);
    expect(screen.getByText(/HOURLY FORECAST/i)).toBeInTheDocument();
  });

  it('handles empty forecast list', () => {
    const emptyForecast: ForecastAPIResponse = {
      city: { name: 'Kyiv', country: 'UA' },
      list: [],
    };
    render(<HourlyTemperatureChart forecast={emptyForecast} />);
    expect(screen.getByText(/HOURLY FORECAST/i)).toBeInTheDocument();
  });
});
