import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private headers = {
    headers: {
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': 'a91609691dmsh3e79dfad8861ddfp1fb497jsn74d07990dda6',
    },
  };
  public day = {};
  constructor(private http: HttpClient) {}

  async fetchData(location: string) {
    let response: any | undefined;
    try {
      response = await this.http
        .get<{
          cod: string;
          list: Array<object>;
        }>(
          `https://community-open-weather-map.p.rapidapi.com/climate/month?q=${location}`,
          this.headers
        )
        .toPromise();
    } catch (err) {
      console.log(err);
      return [];
    }
    return response.list;
  }
}
