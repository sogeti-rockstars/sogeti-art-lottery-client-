import { DOCUMENT } from '@angular/common';
import {
    AfterContentChecked,
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit, AfterContentChecked, AfterViewChecked, OnChanges {
    public contData = new Map<number, [Contestant, boolean, ContestantRowComponent | undefined]>();

    public selectedItemsAmount = 0;

    @Output()
    public recalculateWidthsEvent = new EventEmitter<void>();
    public this = this;
    private colWidths = [0, 0, 0, 0, 0];
    private colGap = 20;

    public filterDataFunction = (val: any, query: string) => {
        val[1] = !val[0].name.toLowerCase().includes(query.toLowerCase());
    };

    constructor(private service: ContestantService, public cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {}

    ngOnChanges(changes: SimpleChanges): void {}

    ngOnInit(): void {
        this.loadContestants();
    }

    ngAfterContentChecked(): void {
        this.recalculateWidthsEvent.emit();
    }

    ngAfterViewChecked(): void {}

    public reportWidths(widths: number[]) {
        widths.forEach((e, i) => {
            if (e > this.colWidths[i]) this.colWidths[i] = e;
        });

        this.setColStartPositions(this.colWidths);
    }

    public contRowElementClickedEvent(event: [Contestant, string, boolean]) {
        if (event[1] == 'remove') {
            let contId = event[0].id;
            this.contData.delete(contId);
            this.recalculateWidths();
        }
    }

    public selChangeListener([id, value]: [number, boolean]): void {
        // console.log(`${id} => ${value}`); // Useful
        this.selectedItemsAmount += value ? +1 : -1;
        console.log(this.selectedItemsAmount);
    }

    public filteredItemsChangeListener(newvals: any) {
        this.contData = newvals;
        this.recalculateWidths();
    }

    private loadContestants(): void {
        this.service.getContestants().subscribe({
            next: (resp) => {
                // let newMap = new Map<number, [Contestant, boolean, ContestantRowComponent | undefined, number[]]>();
                let newMap = new Map<number, [Contestant, boolean, ContestantRowComponent | undefined]>();
                resp.forEach((c) => {
                    newMap.set(c.id, [c, false, undefined]);
                });

                this.contData = new Map(newMap);
            },
        });
    }

    private recalculateWidths() {
        this.cdr.detectChanges();
        this.colWidths = [0, 0, 0, 0, 0];
        this.recalculateWidthsEvent.emit();
        this.setColStartPositions(this.colWidths);
        console.log('recalculating widths...');
    }

    private setColStartPositions(widths: number[]) {
        this.document.documentElement.style.setProperty(`--item-col-1`, '0px');
        this.document.documentElement.style.setProperty(`--item-col-2`, this.colGap * 1 + widths.slice(0, 1).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-3`, this.colGap * 2 + widths.slice(0, 2).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-4`, this.colGap * 3 + widths.slice(0, 3).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-5`, this.colGap * 4 + widths.slice(0, 4).reduce((s, t) => s + t) + 'px');
    }
}
