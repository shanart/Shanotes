import {Injectable} from '@angular/core';
import {Note} from "../common/models/common";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export interface NotesResponse {
    count: number
    next: string | null
    previous: string | null,
    results: Note[]
}


@Injectable({
    providedIn: 'root'
})
export class NotesService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {
    }

    getShortNotesList(): Observable<NotesResponse> {
        const url = `/api/v1/notes/?list=short`;
        return this.http.get<NotesResponse>(url, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getNoteDetail(id: number): Observable<Note> {
        const url = `/api/v1/notes/${id}`;
        return this.http.get<Note>(url, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(res: HttpErrorResponse | any) {
        // TODO: If res.status == 404 - show 404 error page
        console.error(res.error || res.body.error);
        return throwError(res.error || 'Server error');
    }
}
