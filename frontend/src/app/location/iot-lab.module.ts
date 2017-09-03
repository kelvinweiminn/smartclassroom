import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { IotLabComponent } from './iot-lab.component';
import { IotLabRoutingModule } from './iot-lab-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';


@NgModule({
  imports: [
    IotLabRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule,
    NgxMyDatePickerModule
  ],
  declarations: [ IotLabComponent ]
})
export class IotLabModule { }
