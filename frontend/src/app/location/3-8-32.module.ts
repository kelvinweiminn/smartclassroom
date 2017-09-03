import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ThreeTwoComponent } from './3-8-32.component';
import { ThreeTwoRoutingModule } from './3-8-32-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    ThreeTwoRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ ThreeTwoComponent ]
})
export class ThreeTwoModule { }
