import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NotesService} from "./notes.service";
import {DashboardComponent} from "./dashboard.component";
import {SidebarComponent} from './sidebar/sidebar.component';
import {BrowserModule} from "@angular/platform-browser";
import {TopbarComponent} from './topbar/topbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        TopbarComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        DashboardRoutingModule,
        FontAwesomeModule
    ],
    providers: [
        NotesService
    ]
})
export class DashboardModule {
}
