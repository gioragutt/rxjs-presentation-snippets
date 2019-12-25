import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-users',
  template: `
    <div>Better</div>
    <pre class="example">{{ users$ | async | json }}</pre>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
  `
})
export class UsersComponent {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.refresh();
  }

  refresh() {
    this.users$ = this.usersService.getUsers();
  }
}
