import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { ControlComponent } from './control/control.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'locations',
        loadChildren: './dropdownlist/dropdownlist.module#DropdownlistModule'
      },
      {
        path: 'batteries',
        loadChildren: './batteries/batteries.module#BatteriesModule'
      },
      {
        path: 'control',
        component: ControlComponent,
        data: {
          title: 'Control'
        }
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
