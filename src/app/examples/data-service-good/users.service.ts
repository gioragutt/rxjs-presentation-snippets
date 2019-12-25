import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer, interval } from 'rxjs';
import { switchMap, repeat, repeatWhen, delay, take } from 'rxjs/operators';
import { User } from 'src/app/user.model';

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
