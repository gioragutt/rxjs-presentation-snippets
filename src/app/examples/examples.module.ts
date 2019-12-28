import { NgModule } from '@angular/core';
import { PROVIDE_MOCK_DATA_INTERCEPTOR } from '../mock-data-interceptor.service';
import { SharedModule } from '../shared/shared.module';
import { DataServiceBadComponent } from './1-data-service-bad/data-service-bad.component';
import { DataServiceBetterComponent } from './2-data-service-better/data-service-better.component';
import { DataServiceGoodComponent } from './3-data-service-good/data-service-good.component';
import { SharingSubscriptionComponent } from './4-sharing-subscription/sharing-subscription.component';
import { ShowDataComponent } from './4-sharing-subscription/show-data.component';
import { UnsubcribingComponent } from './5-unsubcribing/unsubcribing.component';
import { SubjectForEventsComponent } from './6-subject-for-events/subject-for-events.component';
import { UsersTableComponent } from './6-subject-for-events/users-table/users-table.component';

@NgModule({
  declarations: [
    UnsubcribingComponent,
    DataServiceBadComponent,
    DataServiceBetterComponent,
    DataServiceGoodComponent,
    SubjectForEventsComponent,
    SharingSubscriptionComponent,

    UsersTableComponent,
    ShowDataComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    PROVIDE_MOCK_DATA_INTERCEPTOR
  ],
  exports: [
    UnsubcribingComponent,
    DataServiceBadComponent,
    DataServiceBetterComponent,
    DataServiceGoodComponent,
    SubjectForEventsComponent,
    SharingSubscriptionComponent,
  ],
})
export class ExamplesModule { }
