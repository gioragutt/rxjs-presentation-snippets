import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FakeUser } from 'src/app/mock-data-interceptor.service';

@Injectable()
export class UsersService {
  private refreshTrigger = new Subject<void>();

  readonly users$: Observable<FakeUser[]> =
    this.refreshTrigger.pipe(
      startWith(null), // HACK: explanation below
      switchMap(() =>
        this.http.get<FakeUser[]>('/users').pipe(
          startWith(null), // Loading indication,
        )
      ));

  constructor(private http: HttpClient) { }

  refresh(): void {
    this.refreshTrigger.next();
  }
}

@Component({
  selector: 'app-data-service-good',
  providers: [UsersService],
  styleUrls: ['../examples.scss'],
  template: `
    <div>
      Good
      <button mat-button (click)="refresh()">Refresh</button>
    </div>
    <pre *ngIf="users$ | async as users; else loading">
      {{ users | json }}
    </pre>
    <ng-template #loading>
      <h1>Loading...</h1>
    </ng-template>
  `
})
export class DataServiceGoodComponent {
  users$: Observable<FakeUser[]> = this.usersService.users$;

  constructor(private usersService: UsersService) { }

  refresh() {
    this.usersService.refresh();
  }
}

/**
 * Why is it good?
 *
 * Because the component manages no state,
 * All logic is handled by the service (better unit testing).
 *
 * How can it be better?
 *
 * We can get rid of the loading$ observable,
 * and have a single observable represent the query state.
 *
 * See example 6 for reference
 */

/**
 * Hack explanation:
 *
 * Due to this not being immediately subscribed to,
 * The refresh triggers would only works once
 * user$ is subscribed to. This is why calling refresh()
 * During the service constructor or component constructor won't work.
 *
 * `startWith(null)` sends an initial trigger value to the observable (once subscribed),
 * And this causes the first load to happen.
 */
