import { render, screen } from '@testing-library/react';
import DailyForecast from './DailyForecast';
import { ForecastAPIResponse } from '../../store';

const mockForecast: ForecastAPIResponse['list'] = [
  {
    dt: 1747267200, // Thu
    dt_txt: '2025-05-15 00:00:00',
    main: { temp: 22 },
    weather: [{ icon: '01d', description: 'clear sky' }],
  },
  {
    dt: 1747353600, // Fri
    dt_txt: '2025-05-16 00:00:00',
    main: { temp: 24 },
    weather: [{ icon: '02d', description: 'few clouds' }],
  },
];

describe('DailyForecast', () => {
  it('renders daily forecast correctly', () => {
    render(<DailyForecast forecast={mockForecast} />);

    // Перевіряємо, чи рендериться текст "5 DAYS FORECAST"
    expect(screen.getByText(/5 DAYS FORECAST/i)).toBeInTheDocument();

    // Перевіряємо, чи рендеряться прогнози для кожного дня
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();

    // Перевіряємо температуру та опис
    expect(screen.getByText(/22°C/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();

    // Перевіряємо наявність іконок для погодних умов
    expect(screen.getByAltText('Weather icon 01d')).toBeInTheDocument();
  });

  it('does not show more than one forecast per day', () => {
    render(<DailyForecast forecast={mockForecast} />);

    // Перевіряємо, що для кожного дня рендериться лише один елемент
    const forecastItems = screen.getAllByTestId('daily-forecast-item');
    expect(forecastItems).toHaveLength(2);
  });
});
