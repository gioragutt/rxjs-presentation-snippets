import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SubjectForDomEventsRoutingModule } from './subject-for-dom-events-routing.module';
import { SubjectForDomEventsComponent } from './subject-for-dom-events.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [SubjectForDomEventsComponent, UsersTableComponent],
  imports: [
    SharedModule,
    SubjectForDomEventsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class SubjectForDomEventsModule { }
