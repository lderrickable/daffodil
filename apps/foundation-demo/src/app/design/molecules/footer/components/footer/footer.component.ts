import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[daff-footer]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./footer.component.scss'],
  host: {'class': 'daff-footer'},
  encapsulation: ViewEncapsulation.None
})
export class DaffFooterComponent {}