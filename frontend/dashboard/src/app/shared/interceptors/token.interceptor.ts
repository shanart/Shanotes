import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.tokenService.tokensExists()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.tokenService.tokens().access}`
                }
            });
            return next.handle(request);
        }
        return next.handle(request);
    }
}
