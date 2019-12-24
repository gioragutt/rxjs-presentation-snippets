import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectForDomEventsComponent } from './subject-for-dom-events.component';

const routes: Routes = [{
  path: '',
  component: SubjectForDomEventsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectForDomEventsRoutingModule { }
