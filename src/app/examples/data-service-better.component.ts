import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
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
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.refresh();
  }

  refresh() {
    this.users$ = this.usersService.getUsers();
  }
}
