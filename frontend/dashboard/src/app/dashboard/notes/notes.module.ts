import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";

import {NotesComponent} from './notes.component';
import {NotesRoutingModule} from "./notes-routing.module";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        NotesComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        NotesRoutingModule,
        FontAwesomeModule
    ]
})
export class NotesModule {
}
