import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsubcribingComponent } from './unsubcribing/unsubcribing.component';

export const routes: Routes = [
  {
    path: 'data-service/bad',
    loadChildren: () => import('./data-service/data-service-bad/data-service-bad.module')
      .then(m => m.DataServiceBadModule),
    data: {
      group: 'DataService',
      name: 'Bad'
    },
  },
  {
    path: 'data-service/better',
    loadChildren: () => import('./data-service/data-service-better/data-service-better.module')
      .then(m => m.DataServiceBetterModule),
    data: {
      group: 'DataService',
      name: 'Better'
    },
  },
  {
    path: 'data-service/good',
    loadChildren: () => import('./data-service/data-service-good/data-service-good.module')
      .then(m => m.DataServiceGoodModule),
    data: {
      group: 'DataService',
      name: 'Good'
    },
  },
  {
    path: 'subjects-for-dom-events',
    loadChildren: () => import('./subject-for-dom-events/subject-for-dom-events.module')
      .then(m => m.SubjectForDomEventsModule),
    data: {
      name: 'Subjects For Dom Events'
    },
  },
  {
    path: 'unsubscribibg',
    component: UnsubcribingComponent,
    data: {
      name: 'Unsubscribing',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
