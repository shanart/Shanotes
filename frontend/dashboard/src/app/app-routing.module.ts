import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./containers/auth/auth.component";
import {AuthGuard} from "./common/guards/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: AuthComponent},
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        // canLoad: https://www.tektutorialshub.com/angular/angular-canload-guard-example/
        loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
    },
    // {path: '**', redirectTo: '/login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
