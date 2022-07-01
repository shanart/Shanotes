import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NotesService} from "../../../common/services/notes.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Login, Note, Tag} from "../../../common/models/common";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";


@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoteDetailComponent implements OnInit, OnDestroy {
    note_id: number;
    faCalendar = faCalendar;
    note: Note;
    loading: boolean = true;
    allTags$: Observable<Tag[]>;

    noteForm: FormGroup = new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'content': new FormControl(null, Validators.required),
        'tags': new FormControl(null)
    });

    constructor(private notesService: NotesService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params) => {
                this.note_id = params["id"];
                return this.notesService.getNoteDetail(params["id"])
            })
        ).subscribe((result: Note) => {
            this.note = result;
            this.loading = false;
            this.noteForm.controls["title"].setValue(result.title);
            this.noteForm.controls["content"].setValue(result.content);
            this.noteForm.controls["tags"].setValue(result.tags);
        });
    }

    ngOnDestroy(): void {
    }

    onSubmit(): void {
        if (this.noteForm.valid) {
            this.notesService.updateNote(this.note_id, this.noteForm.value as Login).pipe().subscribe(
                (result: Note) => {
                    console.log(result);
                }
            )
        }
    }
}
