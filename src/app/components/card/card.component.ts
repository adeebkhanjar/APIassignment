import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../weather.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(
    private weaetherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @Input() day: any;
  ngOnInit(): void {
    this.day = this.weaetherService.day;
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
    });
  }

  toDate(date: any) {
    return new Date(date * 1000).toLocaleDateString();
  }

  onHomeClick() {
    this.router.navigateByUrl('');
  }
}
