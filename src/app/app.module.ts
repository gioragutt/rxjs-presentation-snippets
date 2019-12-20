import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PROVIDE_MOCK_DATA_INTERCEPTOR } from './mock-data-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PROVIDE_MOCK_DATA_INTERCEPTOR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
