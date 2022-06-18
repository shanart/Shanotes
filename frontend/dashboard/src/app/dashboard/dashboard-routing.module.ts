import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../common/guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";
import {DashboardOverviewComponent} from "./dashboard-overview/dashboard-overview.component";

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
                loadChildren: () => import('./notes/notes-routing.module').then(m => m.NotesRoutingModule)
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
