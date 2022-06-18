import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NotesService} from "./notes.service";
import {DashboardComponent} from "./dashboard.component";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {BrowserModule} from "@angular/platform-browser";
import {TopbarComponent} from './shared/topbar/topbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DashboardOverviewComponent} from './dashboard-overview/dashboard-overview.component';
import {NotesComponent} from "./notes/notes.component";
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        TopbarComponent,
        DashboardOverviewComponent,
        NotesComponent,
        NoteDetailComponent
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
