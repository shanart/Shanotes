import {Injectable} from '@angular/core';
import {Note} from "../common/models/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export interface NotesResponse {
    count: number
    next: string|null
    previous: string|null,
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

    getNotesList(): Observable<NotesResponse> {
        const url = `/api/v1/notes/list`;
        return this.http.get<NotesResponse>(url, this.httpOptions);
    }

}
