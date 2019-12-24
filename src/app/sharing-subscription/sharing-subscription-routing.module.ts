import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharingSubscriptionComponent } from './sharing-subscription.component';

const routes: Routes = [{
  path: '',
  component: SharingSubscriptionComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharingSubscriptionRoutingModule { }
