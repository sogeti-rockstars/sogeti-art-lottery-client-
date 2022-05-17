import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

    public columnPositions!: number[];
    private ignoreReports = false;

    public filterDataFunction = (val: any, query: string) => {
        val[1] = !val[0].name.toLowerCase().includes(query);
    };

    constructor(private service: ContestantService, public cdr: ChangeDetectorRef) {}

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
