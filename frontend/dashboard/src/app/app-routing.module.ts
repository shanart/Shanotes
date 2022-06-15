import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./containers/auth/auth.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: AuthComponent},
    {
        path: 'home',
        canActivate: [AuthGuard],
        // canLoad: https://www.tektutorialshub.com/angular/angular-canload-guard-example/
        loadChildren: () => import('./modules/home/home-routing.module').then(m => m.HomeRoutingModule)
    },
    {path: '**', redirectTo: '/login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
