import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NotesService} from "./notes.service";
import {DashboardComponent} from "./dashboard.component";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {TopbarComponent} from './shared/topbar/topbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DashboardOverviewComponent} from './dashboard-overview/dashboard-overview.component';
import {HexColorPipe} from "../common/pipes/hexColor.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        TopbarComponent,
        DashboardOverviewComponent,

        // helpers
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        NotesService
    ]
})

export class DashboardModule {
}
