import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourSixComponent } from './3-7-46.component';


const routes: Routes = [
  {
    path: '',
    component: FourSixComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FourSixRoutingModule {}
