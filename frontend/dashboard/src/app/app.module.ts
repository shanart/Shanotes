import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from "./containers/auth/auth.component";
import {authInterceptorProviders} from "./common/interceptors/token.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// TODO: If comment this import - error on <router-outlet> in NotesComponent ...
import {DashboardModule} from "./dashboard/dashboard.module";


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
