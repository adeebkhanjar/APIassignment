import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'weatherAPI';
  weatherArray: Array<any> = [];
  textValue: string = '';
  locationName: string = 'Israel';
  placeHolder: string = 'city...';
  titleMSG: string = '30 days Climate forecast for ';
  constructor(
    private http: HttpClient,
    private weaetherService: WeatherService
  ) {}

  async ngOnInit() {
    this.weatherArray = await this.weaetherService.fetchData(this.locationName);
    console.log(this.weatherArray);
  }

  onTextChange(event: Event) {
    this.textValue = (<HTMLInputElement>event.target).value;
  }
  async onClick() {
    console.log('name', this.locationName);

    this.weatherArray = await this.weaetherService.fetchData(this.textValue);
    console.log('ddddddddddddddd', this.weatherArray);
    console.log('name', this.locationName);
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
}
