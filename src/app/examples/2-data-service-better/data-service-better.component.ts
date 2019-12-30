import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeUser } from 'src/app/mock-data-interceptor.service';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<FakeUser[]> {
    return this.http.get<FakeUser[]>('/users');
  }
}

@Component({
  selector: 'app-data-service-better',
  providers: [UsersService],
  styleUrls: ['../examples.scss'],
  template: `
    <div>
      Better
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
export class DataServiceBetterComponent {
  users$: Observable<FakeUser[]>;

  constructor(private usersService: UsersService) {
    this.refresh();
  }

  refresh() {
    this.users$ = this.usersService.getUsers();
  }
}

/**
 * Why is it better?
 *
 * Because you don't have to manage subscriptions (AsyncPipe),
 * And you get the loading state for free.
 *
 * Why is it still not good?
 *
 * Because you create new Observable every request
 * (aka: this.users$ is a new reference)
 */
