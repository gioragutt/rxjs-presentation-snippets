import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { DataService, User } from '../../data.service';
import { QueryStatus, withQueryStatus } from './query-status';

function controlValue<T>(control: FormControl): Observable<T> {
  return control.valueChanges.pipe(startWith(control.value));
}

@Component({
  selector: 'app-subject-for-events',
  templateUrl: './subject-for-events.component.html',
  styleUrls: ['./subject-for-events.component.scss'],
})
export class SubjectForEventsComponent {
  readonly LIMIT_OPTIONS = [
    ...[5, 10, 15].map(value => ({ value, label: `${value}` })),
    { value: Number.POSITIVE_INFINITY, label: 'No limit', }
  ];

  readonly queryText = new FormControl('');
  readonly resultsLimit = new FormControl(this.LIMIT_OPTIONS[0].value);

  readonly results$: Observable<QueryStatus<User[]>> =
    combineLatest(
      controlValue<string>(this.queryText),
      controlValue<number>(this.resultsLimit),
    ).pipe(
      debounceTime(300),
      filter(([queryText]) => queryText.length > 0),
      switchMap(([query, amount]) =>
        withQueryStatus(() => this.data.search(query, amount))),
    );

  constructor(private data: DataService) { }
}

/**
 * Instead of handling events and doing all the logic
 * In an event callback, instead `next` a `Subject` with relevant data
 * From the event, and have it be a source for other observables.
 */
