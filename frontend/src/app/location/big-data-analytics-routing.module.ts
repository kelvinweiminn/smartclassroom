import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BigDataAnalyticsComponent } from './big-data-analytics.component';


const routes: Routes = [
  {
    path: '',
    component: BigDataAnalyticsComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigDataAnalyticsRoutingModule {}
