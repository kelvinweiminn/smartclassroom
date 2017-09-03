                        import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MyDatePickerModule,
    FormsModule,
    NgxMyDatePickerModule 
  ],
  declarations: [ 
    DashboardComponent,
    AnalyticsComponent ]
})
export class DashboardModule { }