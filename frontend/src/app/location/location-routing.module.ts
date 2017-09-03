import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IotLabComponent } from './iot-lab.component';
import { BigDataAnalyticsComponent } from './big-data-analytics.component';
import { FiveNineComponent } from './1-6-59.component';
import { SixZeroComponent } from './1-6-60.component';
import { SixOneComponent } from './1-6-61.component';
import { FourSixComponent } from './3-7-46.component';
import { FiveZeroComponent } from './3-7-50.component';
import { ThreeTwoComponent } from './3-8-32.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Location'
    },
    children: [
      {
        path: 'iot-lab',
        component: IotLabComponent,
        data: {
          title: 'Iot Lab'
        }
      },
      {
        path: 'big-data-analytics',
        component: BigDataAnalyticsComponent,
        data: {
          title: 'Big Data Analytics'
        }
      },
      {
        path: '1-6-59',
        component: FiveNineComponent,
        data: {
          title: '1-6-59'
        }
      },
      {
        path: '1-6-60',
        component: SixZeroComponent,
        data: {
          title: '1-6-60'
        }
      },
      {
        path: '1-6-61',
        component: SixOneComponent,
        data: {
          title: '1-6-61'
        }
      },
      {
        path: '3-7-46',
        component: FourSixComponent,
        data: {
          title: '3-7-46'
        }
      },
      {
        path: '3-7-50',
        component: FiveZeroComponent,
        data: {
          title: '3-7-50'
        }
      },
      {
        path: '3-8-32',
        component: ThreeTwoComponent,
        data: {
          title: '3-8-32'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {}
