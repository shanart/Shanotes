import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../../containers/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        // data: { roles: [Role.admin, Role.designer] },
        // children: [
        //     {path: '', component: NotesListComponent, data: { roles: [Role.admin, Role.designer] }},
        // ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
