import { Component, Input } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent {
  @Input() index: number;
  data$ = this.dataService.dataFromHttp;

  constructor(private dataService: DataService) { }
}
