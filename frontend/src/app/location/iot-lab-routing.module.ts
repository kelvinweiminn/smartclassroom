import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IotLabComponent } from './iot-lab.component';


const routes: Routes = [
  {
    path: '',
    component: IotLabComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotLabRoutingModule {}
