import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SixZeroComponent } from './1-6-60.component';


const routes: Routes = [
  {
    path: '',
    component: SixZeroComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SixZeroRoutingModule {}
