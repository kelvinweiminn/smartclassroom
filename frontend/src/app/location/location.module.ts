import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule }   from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';

import { IotLabComponent } from './iot-lab.component';
import { IotLabRoutingModule } from './iot-lab-routing.module';

import { BigDataAnalyticsComponent } from './big-data-analytics.component';
import { BigDataAnalyticsRoutingModule } from './big-data-analytics-routing.module';

import { FiveNineComponent } from './1-6-59.component';
import { FiveNineRoutingModule } from './1-6-59-routing.module';

import { SixZeroComponent } from './1-6-60.component';
import { SixZeroRoutingModule } from './1-6-60-routing.module';

import { SixOneComponent } from './1-6-61.component';
import { SixOneRoutingModule } from './1-6-61-routing.module';

import { FourSixComponent } from './3-7-46.component';
import { FourSixRoutingModule } from './3-7-46-routing.module';

import { FiveZeroComponent } from './3-7-50.component';
import { FiveZeroRoutingModule } from './3-7-50-routing.module';

import { ThreeTwoComponent } from './3-8-32.component';
import { ThreeTwoRoutingModule } from './3-8-32-routing.module';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    NgxMyDatePickerModule,
    LocationRoutingModule,
    ChartsModule,
    MyDatePickerModule,
    FormsModule,
    IotLabRoutingModule,
    BigDataAnalyticsRoutingModule,
    FiveNineRoutingModule,
    SixZeroRoutingModule,
    SixOneRoutingModule,
    FourSixRoutingModule,
    FiveZeroRoutingModule,
    ThreeTwoRoutingModule,
    
  ],
  declarations: [
    
    IotLabComponent,
    BigDataAnalyticsComponent,
    FiveNineComponent,
    SixZeroComponent,
    SixOneComponent,
    FourSixComponent,
    FiveZeroComponent,
    ThreeTwoComponent,
  ]
})
export class LocationModule { }

