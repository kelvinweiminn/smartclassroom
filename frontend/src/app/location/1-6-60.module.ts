import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SixZeroComponent } from './1-6-60.component';
import { SixZeroRoutingModule } from './1-6-60-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    SixZeroRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ SixZeroComponent ]
})
export class SixZeroModule { }
