export interface dayWeather {
  iconUrl: string;
  description: string;
  temperatures: {
    absolute: number;
    feelsLike: number;
  };
}

export interface todaysWeather extends dayWeather {
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
}

export interface nextDayWeather extends dayWeather {
  date: Date;
}
