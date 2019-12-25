import { NgModule } from '@angular/core';
import { PROVIDE_MOCK_DATA_INTERCEPTOR } from 'src/app/mock-data-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataServiceBetterRoutingModule } from './data-service-better-routing.module';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent
  ],
  providers: [
    UsersService,
    PROVIDE_MOCK_DATA_INTERCEPTOR,
  ],
  imports: [
    SharedModule,
    DataServiceBetterRoutingModule
  ]
})
export class DataServiceBetterModule { }
