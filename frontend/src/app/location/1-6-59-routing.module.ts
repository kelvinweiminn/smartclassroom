import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiveNineComponent } from './1-6-59.component';


const routes: Routes = [
  {
    path: '',
    component: FiveNineComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiveNineRoutingModule {}
