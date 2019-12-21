import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-service/bad',
    loadChildren: () => import('./data-service/data-service-bad/data-service-bad.module')
      .then(m => m.DataServiceBadModule),
  },
  {
    path: 'data-service/better',
    loadChildren: () => import('./data-service/data-service-better/data-service-better.module')
      .then(m => m.DataServiceBetterModule),
  },
  {
    path: 'data-service/good',
    loadChildren: () => import('./data-service/data-service-good/data-service-good.module')
      .then(m => m.DataServiceGoodModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
