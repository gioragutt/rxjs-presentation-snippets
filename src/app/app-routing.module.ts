import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-service/bad',
    loadChildren: () => import('./data-service/data-service-bad/data-service-bad.module')
      .then(m => m.DataServiceBadModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
