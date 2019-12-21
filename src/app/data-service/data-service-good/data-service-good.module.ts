import { NgModule } from '@angular/core';
import { PROVIDE_MOCK_DATA_INTERCEPTOR } from 'src/app/mock-data-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataServiceGoodRoutingModule } from './data-service-good-routing.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

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
    DataServiceGoodRoutingModule
  ]
})
export class DataServiceGoodModule { }
