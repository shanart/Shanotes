import {HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private tokenService: TokenService, private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let authReq = request;

        if (this.tokenService.tokensExists()){
            authReq = this.addTokenHeader(request, this.tokenService.tokens().access);
        }

        return next.handle(authReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(authReq, next);
                }
                return throwError(error);
            }
        ));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = this.tokenService.tokens().refresh;

            if (token)
                return this.authService.refreshToken({"refresh": token}).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;

                        this.tokenService.saveToken(token.accessToken);
                        this.refreshTokenSubject.next(token.accessToken);

                        return next.handle(this.addTokenHeader(request, token.accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.tokenService.signOut();
                        return throwError(err);
                    })
                );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
