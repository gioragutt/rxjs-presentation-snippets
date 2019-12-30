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
  selector: 'app-data-service-bad',
  providers: [UsersService],
  styleUrls: ['../examples.scss'],
  template: `
    <div>
      Bad
      <button mat-button (click)="refresh()">Refresh</button>
    </div>
    <pre *ngIf="!loading; else loader">
      {{ users | json }}
    </pre>
    <ng-template #loader>
      <h1>Loading...</h1>
    </ng-template>
  `,
})
export class DataServiceBadComponent {
  users: FakeUser[] = [];
  loading: boolean;

  constructor(private usersService: UsersService) {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }
}

/**
 * Why is is bad?
 * Because the component saves all the state,
 * and manages loading state manually
 */
