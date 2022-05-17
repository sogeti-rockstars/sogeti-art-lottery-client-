import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit, AfterContentChecked, AfterViewChecked {
    public contData = new Map<number, [Contestant, boolean, boolean, ContestantRowComponent | undefined, number[]]>();
    //                                  filteredout-^^^^^    ^^^^^-removed

    public searchQuery = '';
    public searchForm!: FormGroup;

    public columnPositions!: number[];
    private ignoreReports = false;

    constructor(private service: ContestantService, public cdr: ChangeDetectorRef) {
        this.searchForm = new FormGroup({
            query: new FormControl('', Validators.minLength(2)),
        });
    }

    ngOnInit(): void {
        this.loadContestants();
        this.ignoreReports = true;
    }
    ngAfterContentChecked(): void {
        this.ignoreReports = false;
    }
    ngAfterViewChecked(): void {
        this.columnPositions = this.getCalculatedColumnStartPositions();
        this.cdr.detectChanges();
    }

    public getColumnPositions(): number[] {
        if (this.columnPositions === undefined) return [0, 0, 0, 0, 0, 0];
        else return this.columnPositions;
    }

    public readReportedWidths([comp, colWidths]: [ContestantRowComponent, number[]]): void {
        if (this.ignoreReports || colWidths.length == 0) return;
        let oldVals = this.contData.get(comp.data.id);
        if (oldVals === undefined) oldVals = [comp.data, false, false, comp, colWidths];
        else oldVals[4] = colWidths;
        this.contData.set(comp.data.id, oldVals);
    }

    public keyDownFunction(event: any) {
        this.searchQuery = this.searchForm.get('query')?.value;

        this.contData.forEach((val, _) => {
            val[1] = !val[0].name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });

        if (event.code === 'Enter') console.log('enter pressed');
    }

    public contRowElementClickedEvent(event: [Contestant, string, boolean]) {
        if (event[1] == 'remove') {
            let contId = event[0].id;

            this.contData.delete(contId);
        }
    }

    private loadContestants(): void {
        this.service.getContestants().subscribe({
            next: (resp) => {
                this.contData.clear();
                resp.forEach((c) => {
                    this.contData.set(c.id, [c, false, false, undefined, []]);
                });
            },
        });
    }

    private getCalculatedColumnStartPositions(): number[] {
        let colMaxWidths = this.calcMaxWidths();

        let totalWidth = 0;
        return colMaxWidths.map((v) => {
            let ret = totalWidth;
            totalWidth += v + 10;
            return ret;
        });
    }

    private calcMaxWidths(): number[] {
        let colMaxWidths: number[] = [];
        this.contData.forEach(([_, filteredout, _d, _c, colWidths]) => {
            if (!filteredout)
                colWidths.forEach((width: number, i: number) => {
                    if (colMaxWidths[i] === undefined || colMaxWidths[i] < width) colMaxWidths[i] = width;
                });
        });
        return colMaxWidths;
    }
}
