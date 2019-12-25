import { Component, Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user.model';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class UsersService {
  private refreshTrigger = new Subject<void>();
  private users = new BehaviorSubject<User[]>([]);

  get users$(): Observable<User[]> {
    return this.users.asObservable();
  }

  constructor(private http: HttpClient) {
    this.refreshTrigger.pipe(
      // you can add stuff like debounceTime here
      switchMap(() => this.http.get<User[]>('/users')),
    ).subscribe(this.users);

    this.refresh(); // load initial data, can be placed elsewhere
  }

  refresh(): void {
    this.refreshTrigger.next();
  }
}

@Component({
  selector: 'app-data-service-good',
  providers: [UsersService],
  template: `
    <div>Good</div>
    <pre class="example">{{ users$ | async | json }}</pre>
    <div>
      <button (click)="refresh()">Refresh</button>
    </div>
  `
})
export class DataServiceGoodComponent {
  users$: Observable<User[]> = this.usersService.users$;

  constructor(private usersService: UsersService) { }

  refresh() {
    this.usersService.refresh();
  }
}
