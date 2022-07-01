import {Injectable} from '@angular/core';
import {Tag} from "../models/common";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class TagsService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {
    }

    getTags(): Observable<Tag[]> {
        const url = `/api/v1/meta/tags/`;
        return this.http.get<Tag[]>(url, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(res: HttpErrorResponse | any) {
        return throwError(res.error || 'Server error');
    }
}
