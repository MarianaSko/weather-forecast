export interface WeatherAPIResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastAPIResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface WeatherState {
  citiesData: {
    [city: string]: {
      city: string;
      temp: number;
      description: string;
      iconCode: string;
      lat: number;
      lon: number;
      wind: number;
      humidity: number;
      feelsLike: number;
    } | null;
  };
  citiesLoading: { [city: string]: boolean };
  citiesError: { [city: string]: string | null };

  forecastData: {
    [city: string]: ForecastAPIResponse | null;
  };
  forecastLoading: {
    [city: string]: boolean;
  };
  forecastError: {
    [city: string]: string | null;
  };
}
