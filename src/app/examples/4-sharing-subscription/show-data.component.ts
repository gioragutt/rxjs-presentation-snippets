import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-show-data',
  template: `
    <h1 *ngIf="data$ | async as data; else loading">
      {{index}} - Got {{data.length}} Results
    </h1>

    <ng-template #loading>
      <h1>Loading...</h1>
    </ng-template>
  `,
})
export class ShowDataComponent {
  @Input() index: number;
  data$ = this.dataService.dataFromHttp;

  constructor(private dataService: DataService) { }
}
