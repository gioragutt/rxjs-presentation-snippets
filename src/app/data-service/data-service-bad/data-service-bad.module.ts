import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { DataServiceBadRoutingModule } from './data-service-bad-routing.module';
import { PROVIDE_MOCK_DATA_INTERCEPTOR } from 'src/app/mock-data-interceptor.service';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  providers: [
    UsersService,
    PROVIDE_MOCK_DATA_INTERCEPTOR,
  ],
  imports: [
    SharedModule,
    DataServiceBadRoutingModule,
  ]
})
export class DataServiceBadModule { }
