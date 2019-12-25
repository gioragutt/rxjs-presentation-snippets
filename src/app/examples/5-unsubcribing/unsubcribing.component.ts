import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-unsubcribing',
  template: `
    <h1>Data1: {{data1$ | async}}</h1>
    <h1>Data2: {{data2}}</h1>
    <h1>Data3: {{data3}}</h1>
  `,
})
export class UnsubcribingComponent {
  data1$ = timer(0, 1000);
  data2: number;
  data3: number;

  constructor() {
    timer(100, 1000).pipe(
      tap(v => console.log('data2', v)),
    ).subscribe(v => {
      this.data2 = v;
    });

    timer(200, 1000).pipe(
      tap(v => console.log('data3', v)),
    ).subscribe(v => {
      this.data3 = v;
    });
  }
}

/**
 * 1. No unsubscribe
 * 2. Multiple subscriptions
 * 3. Multiple subscriptions in array
 * 4. takeUntil
 */
