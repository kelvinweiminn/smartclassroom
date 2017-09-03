import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ ChartJSComponent ],
  providers: [DatePipe]
})
export class ChartJSModule { }
