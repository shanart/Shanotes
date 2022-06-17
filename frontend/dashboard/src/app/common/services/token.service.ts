import {Injectable} from '@angular/core';
import {AccessTokenResponse, AuthTokens} from "../models/common";
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode';
import jwtDecode from "jwt-decode";


interface Token {
    exp: number;
    iat: string;
    jti: string;
    token_type: string;
    user_id: string;
}


@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenExpTimer: any;

    constructor(private router: Router) {
        // TODO: on service init setRefreshTimer() to handle page reload?;
    }

    saveToLocalStorage(data: AuthTokens) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        this.setRefreshTimer();
    }

    updateAccessToken(data: AccessTokenResponse) {
        localStorage.setItem('access', data.access);
        this.setRefreshTimer();
    }

    removeAuthToken() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigate(['/login'])
    }

    tokens(): AuthTokens {
        return {
            access: localStorage.getItem('access'),
            refresh: localStorage.getItem('refresh'),
        } as AuthTokens
    }

    tokensExists(): boolean {
        return !!(localStorage.getItem('access') && localStorage.getItem('refresh'));
    }

    private parse_token(token: string): Token {
        return jwtDecode(token);
    }

    private setRefreshTimer(): void {
        if (!this.tokensExists()) {
            // User is unauthorized and have to logout
        }
        const token: Token = this.parse_token(this.tokens().access);
        const exp_date = token.exp * 1000;
        this.tokenExpTimer = setTimeout(() => {
            console.log("logout");
        }, exp_date);
    }
}
