import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit {
    public contestantData!: [Contestant, boolean][];
    public searchQuery = '';
    public searchForm!: FormGroup;

    constructor(private service: ContestantService) {
        this.searchForm = new FormGroup({
            query: new FormControl('', Validators.minLength(2)),
        });
    }

    ngOnInit(): void {
        this.loadContestants();
    }

    private loadContestants(): void {
        this.service.getContestants().subscribe({
            next: (resp) => {
                this.contestantData = new Array(resp.length);
                resp.map((c, i) => (this.contestantData[i] = [c, true]));
            },
        });
    }

    public getVisibleContstants(): Contestant[] {
        return this.contestantData.filter((c) => c[1]).map((c) => c[0]);
    }

    @Output() selChange = new EventEmitter<MatSelectionListChange>();
    public selectedChangeHandler(event: MatSelectionListChange) {
        // event.source.selectionChange.complete();
        this.selChange.emit(event);
    }

    /** called on each keypress and updates the visible items in the list */
    public keyDownFunction(event: any) {
        this.searchQuery = this.searchForm.get('query')?.value;
        this.contestantData.map((c) => {
            c[1] = c[0].name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        if (event.code === 'Enter') console.log(`Enter pressed`);
    }

    public contRowElementClickedEvent(event: [Contestant, string, boolean]) {
        console.log(`contRowElementClickedEvent: ${event[1]}: ${event[0].id} ${event[2]}`);
        if (event[1] == 'remove')
            this.contestantData = this.contestantData.filter((c) => {
                return c[0].id != event[0].id;
            });
    }
}
