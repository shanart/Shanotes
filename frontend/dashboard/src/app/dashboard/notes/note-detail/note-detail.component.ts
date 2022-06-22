import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NotesService} from "../../notes.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Note} from "../../../common/models/common";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoteDetailComponent implements OnInit, OnDestroy {
    faCalendar = faCalendar;
    note: Note;
    loading: boolean = true;

    noteForm: FormGroup = new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'content': new FormControl(null, Validators.required),
    });

    constructor(private notesService: NotesService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params) => this.notesService.getNoteDetail(params["id"]))
        ).subscribe((result: Note) => {
            this.note = result;
            this.loading = false;
            this.noteForm.controls["title"].setValue(result.title);
            this.noteForm.controls["content"].setValue(result.content);
        });
    }

    ngOnDestroy(): void {
    }

    onSubmit(): void {

    }
}
