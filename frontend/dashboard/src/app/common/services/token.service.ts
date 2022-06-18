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
    constructor(private router: Router) {
    }

    saveToLocalStorage(data: AuthTokens) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
    }

    updateAccessToken(data: AccessTokenResponse) {
        localStorage.setItem('access', data.access);
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
}
