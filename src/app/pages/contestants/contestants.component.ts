import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit {
    public contestantRows!: TemplateRef<ContestantRowComponent>[];
    public contestantData!: [Contestant, boolean][];

    public searchQuery = '';
    public searchForm!: FormGroup;

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

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
                // this.contestantRows = new Array(resp.length);
                // resp.map((c, i) => {
                //     let cont = new ContestantRowComponent();
                //     cont.data = c;
                //     this.contestantRows[i] = cont.template;
                // });

                this.contestantData = new Array(resp.length);
                resp.map((c, i) => (this.contestantData[i] = [c, true]));
            },
        });
    }

    public getVisibleContstants(): Contestant[] {
        return this.contestantData.filter((c) => c[1]).map((c) => c[0]);
    }

    public search() {
        console.log(this.searchForm.get('query')?.value);
    }

    keyDownFunction(event: any) {
        this.searchQuery = this.searchForm.get('query')?.value;
        this.contestantData.map((c) => {
            c[1] = c[0].name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        // console.log(event);
        if (event.code === 'Enter') {
            this.search();
        }
    }

    public itemClicked(event: [Contestant, string, boolean]) {
        console.log(`${event[1]}: ${event[0].id} ${event[2]}`);
        if (event[1] == 'remove')
            this.contestantData = this.contestantData.filter((c) => {
                return c[0].id != event[0].id;
            });
        console.log(this.contestantData);
    }
}
