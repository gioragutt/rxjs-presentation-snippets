import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export interface QueryStatus<T> {
  value?: T;
  loading?: boolean;
  error?: any;
}

export function withQueryStatus<T>(queryImpl: () => Observable<T>): Observable<QueryStatus<T>> {
  return queryImpl().pipe(
    map(value => ({ value })),
    startWith(({ loading: true })),
    catchError(error => {
      return of({ error });
    }),
  );
}
