import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../common/guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        children: [
            {
                path: "notes",
                loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
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
