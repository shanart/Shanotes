import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotesService} from "../../notes.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Note} from "../../../common/models/common";


@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoteDetailComponent implements OnInit {
    note: Note;
    loading: boolean = true;

    constructor(private notesService: NotesService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // getNoteDetail
        this.route.params.pipe(
            switchMap((params) => this.notesService.getNoteDetail(params["id"]))
        ).subscribe((result: Note) => {
            this.note = result;
            this.loading = false;
        });
    }
}
