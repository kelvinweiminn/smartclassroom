import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { BigDataAnalyticsComponent } from './big-data-analytics.component';
import { BigDataAnalyticsRoutingModule } from './big-data-analytics-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    BigDataAnalyticsRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [ BigDataAnalyticsComponent ]
})
export class BigDataAnalyticsModule { }
