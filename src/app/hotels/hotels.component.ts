import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, takeLast } from 'rxjs/operators';
import { Hotel } from '../shared/models/hotels.model';
import { HotelsService } from '../shared/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    const sub = this.hotelsService.hotelsSubject.subscribe(hotels => {
      this.hotels = hotels;
    });
    this.subscriptions.push(sub);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
