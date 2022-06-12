export interface weatherDay {
  dt: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  temp: {
    average: number;
    average_max: number;
    average_min: number;
    record_max: number;
    record_min: number;
  };
}
