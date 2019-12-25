import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsubcribingComponent } from './unsubcribing/unsubcribing.component';
import { UsersComponent as DataServiceBadComponent } from './examples/data-service-bad/users.component';
import { UsersComponent as DataServiceBetterComponent } from './examples/data-service-better/users.component';
import { UsersComponent as DataServiceGoodComponent } from './examples/data-service-good/users.component';

export const routes: Routes = [
  {
    path: 'data-service/bad',
    component: DataServiceBadComponent,
    data: {
      group: 'DataService',
      name: 'Bad'
    },
  },
  {
    path: 'data-service/better',
    component: DataServiceBetterComponent,
    data: {
      group: 'DataService',
      name: 'Better'
    },
  },
  {
    path: 'data-service/good',
    component: DataServiceGoodComponent,
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
    path: 'unsubscribing',
    component: UnsubcribingComponent,
    data: {
      group: 'Subscription Handling',
      name: 'Unsubscribing',
    }
  },
  {
    path: 'subscription-sharing',
    loadChildren: () => import('./sharing-subscription/sharing-subscription.module')
      .then(m => m.SharingSubscriptionModule),
    data: {
      group: 'Subscription Handling',
      name: 'Subsription Sharing'
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
