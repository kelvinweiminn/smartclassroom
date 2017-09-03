import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiveZeroComponent } from './3-7-50.component';


const routes: Routes = [
  {
    path: '',
    component: FiveZeroComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiveZeroRoutingModule {}
