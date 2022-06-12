import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./containers/auth/auth.component";

const routes: Routes = [
    // {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '', component: AuthComponent},
    // {
    //     path: 'home',
    //     loadChildren: () => import('./modules/home/home-routing.module').then(m => m.HomeRoutingModule)
    // },
    {path: '**', redirectTo: '/login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
