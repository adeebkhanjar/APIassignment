import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { weatherDay } from '../interfaces/weather.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = 'weatherAPI';
  weatherArray: Array<any> = [];
  textValue: string = '';
  locationName: string = 'Israel';
  placeHolder: string = 'city...';
  titleMSG: string = '30 days Climate forecast for ';
  constructor(
    private http: HttpClient,
    private weaetherService: WeatherService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.weatherArray = await this.weaetherService.fetchData(this.locationName);
  }

  onTextChange(event: Event) {
    this.textValue = (<HTMLInputElement>event.target).value;
  }
  async onClick() {
    this.weatherArray = await this.weaetherService.fetchData(this.textValue);
    this.weatherArray.length > 0
      ? ((this.locationName = ` ${this.textValue}`),
        (this.titleMSG = '30 days Climate forecast for '))
      : ((this.locationName = 'invalid location name'), (this.titleMSG = ''));
  }

  sortByTemperature() {
    this.weatherArray = this.weatherArray.sort(
      (a, b) => a.temp.average - b.temp.average
    );
  }
  sortByDate() {
    this.weatherArray = this.weatherArray.sort((a, b) => a.dt - b.dt);
  }

  sortByHumidity() {
    this.weatherArray = this.weatherArray.sort(
      (a, b) => a.humidity - b.humidity
    );
  }
  toDate(date: any) {
    return new Date(date).toLocaleDateString();
  }
  onRowClick(data: weatherDay) {
    this.weaetherService.day = data;
    this.router.navigateByUrl(`/card/:${data.dt}`);
  }
}
