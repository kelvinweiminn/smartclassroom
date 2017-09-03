import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'overview',
        component: DashboardComponent,
        data: {
          title: 'Overview'
        }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}