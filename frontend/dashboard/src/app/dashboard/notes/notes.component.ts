import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotesService} from "../../common/services/notes.service";
import {Note} from "../../common/models/common";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: '#notes.h-100',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
    notes: Note[] = [];
    loading: boolean = true;
    faSlidersH = faSlidersH;

    constructor(private notesService: NotesService) {
    }

    ngOnInit(): void {
        this.notesService.getShortNotesList().pipe().subscribe({
            next: data => {
                this.notes = data.results;
                this.loading = false;
            }
        });
    }

}
