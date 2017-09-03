import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DropdownlistComponent } from './dropdownlist.component';

const routes: Routes = [
  {
    path: '',
    component: DropdownlistComponent,
    data: {
      title: 'Locations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownlistRoutingModule {}
