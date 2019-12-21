import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  template: `
    <div>Good</div>
    <pre class="example">{{ users$ | async | json }}</pre>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
  `
})
export class UsersComponent {
  users$: Observable<User[]> = this.usersService.users$;

  constructor(private usersService: UsersService) { }

  refresh() {
    this.usersService.refresh();
  }
}
