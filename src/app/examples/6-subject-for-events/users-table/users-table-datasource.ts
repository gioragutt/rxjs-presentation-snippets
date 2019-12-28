import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../data.service';

export class UsersTableDataSource extends DataSource<User> {
  paginator: MatPaginator;
  sort: MatSort;
  private data$ = new BehaviorSubject<User[]>([]);

  get length(): number | undefined {
    if (this.data$.value) {
      return this.data$.value.length;
    }
    return undefined;
  }

  update(data: User[]): void {
    this.data$.next(data);
  }

  connect(): Observable<User[]> {
    const dataMutations = [
      this.data$,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => this.getPagedData(this.getSortedData([...this.data$.value])))
    );
  }

  disconnect() { }

  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstName': return compare(a, b, o => o.firstName, isAsc);
        case 'lastName': return compare(a, b, o => o.lastName, isAsc);
        case 'email': return compare(a, b, o => o.email, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare<T, R>(aObj: T, bObj: T, field: (obj: T) => R, isAsc: boolean) {
  const a = field(aObj);
  const b = field(bObj);
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
