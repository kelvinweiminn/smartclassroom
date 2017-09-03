import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FiveZeroComponent } from './3-7-50.component';
import { FiveZeroRoutingModule } from './3-7-50-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    FiveZeroRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ FiveZeroComponent ]
})
export class FiveZeroModule { }
