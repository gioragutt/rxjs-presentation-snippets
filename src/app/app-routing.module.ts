import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataServiceBadComponent } from './examples/1-data-service-bad/data-service-bad.component';
import { DataServiceBetterComponent } from './examples/2-data-service-better/data-service-better.component';
import { DataServiceGoodComponent } from './examples/3-data-service-good/data-service-good.component';
import { SharingSubscriptionComponent } from './examples/4-sharing-subscription/sharing-subscription.component';
import { UnsubcribingComponent } from './examples/5-unsubcribing/unsubcribing.component';
import { SubjectForDomEventsComponent } from './examples/6-subject-for-dom-events/subject-for-dom-events.component';

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
    component: SubjectForDomEventsComponent,
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
    component: SharingSubscriptionComponent,
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
