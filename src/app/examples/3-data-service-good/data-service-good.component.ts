import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FakeUser } from 'src/app/mock-data-interceptor.service';

@Injectable()
export class UsersService {
  private refreshTrigger = new Subject<void>();
  private loading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  readonly users$: Observable<FakeUser[]> =
    this.refreshTrigger.pipe(
      // you can add stuff like debounceTime here
      tap(() => this.loading.next(true)),
      switchMap(() => this.http.get<FakeUser[]>('/users')),
      tap(() => this.loading.next(false)),
    );

  constructor(private http: HttpClient) {
    // load initial data, can be placed elsewhere
    this.refresh();
  }

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
    <h1 *ngIf="loading$ | async; else loaded">Loading...</h1>
    <ng-template #loaded>
      <pre>{{ users$ | async | json }}</pre>
    </ng-template>
  `
})
export class DataServiceGoodComponent {
  users$: Observable<FakeUser[]> = this.usersService.users$;
  loading$: Observable<boolean> = this.usersService.loading$;

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
