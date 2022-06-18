import {Injectable} from '@angular/core';
import {AccessTokenResponse, AuthTokens, Login, TokenRefresh} from "../models/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {TokenService} from "./token.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    auth_root: string = `/api/v1/auth/`;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // TODO: define refresh login response interface
    login(form: Login): Observable<any> {
        return this.http.post<AuthTokens>(this.auth_root, form, this.httpOptions);
    }

    // TODO: define refresh token response interface
    refreshToken(form: TokenRefresh): Observable<any> {
        return this.http.post<AccessTokenResponse>(`${this.auth_root}refresh/`, form, this.httpOptions);
    }

    // TODO: verify token?

    isAuthenticated(): boolean {
        return this.tokenService.tokensExists()
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }

}
