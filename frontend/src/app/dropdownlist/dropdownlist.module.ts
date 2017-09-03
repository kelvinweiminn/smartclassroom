import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DropdownlistComponent } from './dropdownlist.component';
import { DropdownlistRoutingModule } from './dropdownlist-routing.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    DropdownlistRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MyDatePickerModule,
    FormsModule,
    NgxMyDatePickerModule 
  ],
  declarations: [ DropdownlistComponent ]
})
export class DropdownlistModule { }
