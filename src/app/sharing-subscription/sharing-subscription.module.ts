import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharingSubscriptionRoutingModule } from './sharing-subscription-routing.module';
import { SharingSubscriptionComponent } from './sharing-subscription.component';
import { ShowDataComponent } from './show-data/show-data.component';

@NgModule({
  declarations: [
    SharingSubscriptionComponent,
    ShowDataComponent,
  ],
  imports: [
    SharedModule,
    SharingSubscriptionRoutingModule
  ]
})
export class SharingSubscriptionModule { }
