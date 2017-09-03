import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SixOneComponent } from './1-6-61.component';


const routes: Routes = [
  {
    path: '',
    component: SixOneComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SixOneRoutingModule {}
