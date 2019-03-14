import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DaffInMemoryDriverModule } from './drivers/in-memory/in-memory.module';
import { DaffInMemoryService } from './drivers/in-memory/in-memory.service';


import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(DaffInMemoryService),
    DaffInMemoryDriverModule.forRoot({
      BASE_URL: environment.API_BASE
    })
  ]
})
export class InMemoryModule {}