import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaffHeaderModule } from '../../design/molecules/daff-header/daff-header.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { HeaderViewComponent } from './components/header-view/header-view.component';

@NgModule({
  imports: [
    CommonModule,
    DaffHeaderModule,
    SidebarModule
  ],
  declarations: [
    HeaderComponent,
    HeaderViewComponent
  ],
  exports: [
    HeaderComponent,
    HeaderViewComponent
  ]
})
export class HeaderModule { }