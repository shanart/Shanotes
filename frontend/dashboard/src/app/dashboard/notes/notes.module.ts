import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotesComponent} from "./notes.component";
import {NoteDetailComponent} from "./note-detail/note-detail.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HexColorPipe} from "../../common/pipes/hexColor.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
    {
        path: "",
        component: NotesComponent,
        children: [
            {
                path: ":id",
                component: NoteDetailComponent
            }
        ]
    }
];


@NgModule({
    declarations: [
        NotesComponent,
        NoteDetailComponent,

        // Helpers
        HexColorPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        FontAwesomeModule
    ]
})
export class NotesModule {
}
