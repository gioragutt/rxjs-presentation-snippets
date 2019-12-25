import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FakeUser } from 'src/app/mock-data-interceptor.service';

@Injectable()
export class UsersService {
  private refreshTrigger = new Subject<void>();
  private users = new BehaviorSubject<FakeUser[]>([]);

  get users$(): Observable<FakeUser[]> {
    return this.users.asObservable();
  }

  constructor(private http: HttpClient) {
    this.refreshTrigger.pipe(
      // you can add stuff like debounceTime here
      switchMap(() => this.http.get<FakeUser[]>('/users')),
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
  users$: Observable<FakeUser[]> = this.usersService.users$;

  constructor(private usersService: UsersService) { }

  refresh() {
    this.usersService.refresh();
  }
}
