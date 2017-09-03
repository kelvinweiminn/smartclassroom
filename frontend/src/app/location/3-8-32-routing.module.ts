import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeTwoComponent } from './3-8-32.component';


const routes: Routes = [
  {
    path: '',
    component: ThreeTwoComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeTwoRoutingModule {}
