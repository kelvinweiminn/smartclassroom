import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SixOneComponent } from './1-6-61.component';
import { SixOneRoutingModule } from './1-6-61-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    SixOneRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ SixOneComponent ]
})
export class SixOneModule { }
