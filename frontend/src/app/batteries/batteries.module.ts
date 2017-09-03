import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { BatteriesComponent } from './batteries.component';
import { BatteriesRoutingModule } from './batteries-routing.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    BatteriesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MyDatePickerModule,
    FormsModule,
    NgxMyDatePickerModule 
  ],
  declarations: [ BatteriesComponent ]
})
export class BatteriesModule { }
