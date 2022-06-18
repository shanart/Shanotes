import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../common/guards/auth.guard";
import {NotesComponent} from "./notes.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: NotesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotesRoutingModule {
}
