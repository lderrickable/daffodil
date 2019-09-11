import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DaffioDoc } from '../../models/doc';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';


@Component({
  selector: 'daffio-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaffioDocViewerComponent {

  /**
   * The doc to render
   */
  @Input() doc: DaffioDoc;

  highlighted: boolean = false;

  ngAfterViewChecked() {
    if (this.doc && !this.highlighted) {
      Prism.highlightAll();
      this.highlighted = true;
    }
  }

}
