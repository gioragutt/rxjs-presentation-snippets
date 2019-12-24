import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';
import { DataService, User } from './data.service';
import { QueryStatus, withQueryStatus } from './query-status';

function controlValue<T>(control: FormControl): Observable<T> {
  return control.valueChanges.pipe(startWith(control.value));
}

@Component({
  selector: 'app-subject-for-dom-events',
  templateUrl: './subject-for-dom-events.component.html',
  styleUrls: ['./subject-for-dom-events.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectForDomEventsComponent {
  readonly LIMIT_OPTIONS = [
    ...[5, 10, 15].map(value => ({ value, label: `${value}` })),
    { value: Number.POSITIVE_INFINITY, label: 'No limit', }
  ];

  readonly keyups = new Subject<any>();
  readonly resultsLimit = new FormControl(this.LIMIT_OPTIONS[0].value);

  readonly results$: Observable<QueryStatus<User[]>> =
    combineLatest(
      this.keyups.pipe(debounceTime(300)),
      controlValue<number>(this.resultsLimit)
    ).pipe(
      map(([e, amount]) => [e.target.value, amount]),
      filter(([q]) => q.length > 0),
      switchMap(([query, amount]) =>
        withQueryStatus(() => this.data.search(query, amount))),
    );

  constructor(private data: DataService) { }
}
