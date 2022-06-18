import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../common/guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";
import {DashboardOverviewComponent} from "./dashboard-overview/dashboard-overview.component";
import {NotesComponent} from "./notes/notes.component";
import {NoteDetailComponent} from "./notes/note-detail/note-detail.component";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: DashboardOverviewComponent
            },
            {
                path: 'notes',
                component: NotesComponent,
                children: [
                    {
                        path: ':id',
                        component: NoteDetailComponent
                    }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
