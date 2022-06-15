import {Injectable} from '@angular/core';
import {tap} from "rxjs/operators";
import {AuthTokens} from "../models/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

    getNotesList() {
        const url = `/api/v1/notes/list`;
        return this.http.get<any>(url, this.httpOptions);
    }

}
