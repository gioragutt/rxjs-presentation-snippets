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
  template: `
    <div>Better</div>
    <pre class="example">{{ users$ | async | json }}</pre>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
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
