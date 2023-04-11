import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../services/loader.service'

@Component({
  selector: 'front-end-internship-assignment-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
