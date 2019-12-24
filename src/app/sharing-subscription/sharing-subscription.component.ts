import { Component } from '@angular/core';

@Component({
  selector: 'app-sharing-subscription',
  template: `
    <app-show-data [index]="1"></app-show-data>
    <mat-divider></mat-divider>
    <app-show-data [index]="2"></app-show-data>
  `,
})
export class SharingSubscriptionComponent { }
