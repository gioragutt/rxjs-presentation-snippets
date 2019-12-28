import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { DataService, User } from '../../data.service';
import { QueryStatus, withQueryStatus } from './query-status';

function controlValue<T>(control: FormControl): Observable<T> {
  return control.valueChanges.pipe(startWith(control.value));
}

@Component({
  selector: 'app-subject-for-dom-events',
  templateUrl: './subject-for-dom-events.component.html',
  styleUrls: ['./subject-for-dom-events.component.scss'],
})
export class SubjectForDomEventsComponent {
  readonly LIMIT_OPTIONS = [
    ...[5, 10, 15].map(value => ({ value, label: `${value}` })),
    { value: Number.POSITIVE_INFINITY, label: 'No limit', }
  ];

  readonly queryText = new FormControl('');
  readonly resultsLimit = new FormControl(this.LIMIT_OPTIONS[0].value);

  readonly results$: Observable<QueryStatus<User[]>> =
    combineLatest(
      controlValue<string>(this.queryText),
      controlValue<number>(this.resultsLimit)
    ).pipe(
      debounceTime(300),
      filter(([q]) => q.length > 0),
      switchMap(([query, amount]) =>
        withQueryStatus(() => this.data.search(query, amount))),
    );

  constructor(private data: DataService, private fb: FormBuilder) { }
}

/**
 * Instead of handling handling events and doing all the logic
 * In an event callback, instead `next` a `Subject` with relevant data
 * From the event, and have it be a source for other observables.
 */
