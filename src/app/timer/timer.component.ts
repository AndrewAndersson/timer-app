import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @ViewChild('wait') wait;
  count = 0;
  timer: Observable<number>;
  ticker: Subscription;
  isStart: boolean;

  constructor() { }

  ngOnInit() {
    this.isStart = false;
    this.timer =  interval(1000).pipe(
      map((t) => this.count += 1)
    );
    this.waitClick().subscribe(() => {
      this.ticker.unsubscribe();
      this.isStart = false;
    });
  }
  onClick() {
    if (!this.isStart) {
      this.ticker = this.timer.subscribe(t => this.count = t);
      this.isStart = true;
    } else {
      this.ticker.unsubscribe();
    }
  }
  waitClick<FromEventObservable>() {
    return fromEvent(this.wait._elementRef.nativeElement, 'click').pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }
  reset() {
    this.count = 0;
    this.isStart = false;
  }

}
