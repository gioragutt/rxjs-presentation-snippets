import { Component } from '@angular/core';
import { User } from 'src/app/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  template: `
    <span>{{ users | json }}</span>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
  `
})
export class UsersComponent {
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
