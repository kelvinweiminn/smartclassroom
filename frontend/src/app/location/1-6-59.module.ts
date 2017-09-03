import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FiveNineComponent } from './1-6-59.component';
import { FiveNineRoutingModule } from './1-6-59-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    FiveNineRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ FiveNineComponent ]
})
export class FiveNineModule { }
