import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker'

import { MomentTimezoneModule } from 'angular-moment-timezone';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsComponent } from './layouts/notifications/notifications.component';
import { NotificationItemComponent } from './layouts/notifications/notification-item/notification-item.component';
import { FacialComponent } from './facial/facial.component';
import { ControlComponent } from './control/control.component';

// import { async } from 'async-waterfall';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    MomentTimezoneModule,
    FormsModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NotificationsComponent,
    NotificationItemComponent,
    FacialComponent,
    ControlComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  DataService,
  NgxMyDatePickerModule],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
