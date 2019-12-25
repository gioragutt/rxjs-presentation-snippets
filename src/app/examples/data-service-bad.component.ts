import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }
}

@Component({
  selector: 'app-data-service-bad',
  providers: [UsersService],
  template: `
    <div>Bad</div>
    <pre class="example">{{ users | json }}</pre>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
  `,
})
export class DataServiceBadComponent {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.refresh();
  }

  refresh() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
