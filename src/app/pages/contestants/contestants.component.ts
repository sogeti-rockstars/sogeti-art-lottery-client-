import { DOCUMENT, KeyValue } from '@angular/common';
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Inject,
    OnInit,
    Output,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Scroll } from '@angular/router';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],

    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestantsComponent implements OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, AfterContentInit {
    public contDataRender: Contestant[] = [];
    public contDataAll: Contestant[] = [];

    public contData = new Map<number, Contestant>();
    public contComp = new Map<number, ContestantRowComponent>();

    public selectedItemsAmount = 0;

    private colWidths = [0, 0, 0, 0, 0];
    private colGap = 20;

    @Output() public recalculateWidthsEvent = new EventEmitter<void>();

    @ViewChildren('contRow') contRows!: ContestantRowComponent[];

    public onContestantRowAfterViewInit = (contRow: ContestantRowComponent) => {
        contRow.reportWidthsSubscription = this.recalculateWidthsEvent.subscribe(() => {
            if (contRow.viewState.filtered) return;
            this.reportWidths(contRow.getAllColumnWidths(contRow.collapsedItem));
        });
    };

    public onContestantRowDestroy = (contRow: ContestantRowComponent) => {
        contRow.reportWidthsSubscription!.unsubscribe();
    };

    public filterMapFunction = (val: ContestantRowComponent, query: string) => {
        val.viewState.filtered = !val.data.name.toLowerCase().includes(query.toLowerCase());
    };

    //
    // type contViewData = { data: Contestant; filtered: Boolean; component?: ContestantRowComponent };
    // this.contComponents = new Set();
    // public filterSetFunction = (val: ContestantRowComponent, query: string): void => {
    //     val.viewState.filtered = !val.data.name.toLowerCase().includes(query.toLowerCase());
    // };

    constructor(private service: ContestantService, public cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {}

    ngAfterContentInit(): void {
        // console.log('ngAfterContentInit');
    }

    ngAfterViewChecked(): void {
        // console.log('ngAfterViewChecked');
    }
    ngAfterViewInit(): void {}

    ngOnInit(): void {
        this.loadContestants();
    }

    private oldListLen = 0;
    ngAfterContentChecked(): void {
        // if (this.oldListLen == this.contData.size) {
        // console.log('ngAfterContentChecked exit');
        // return;
        // }
        // console.log('ngAfterContentChecked recalc');
        // this.cdr.detectChanges();
        this.redrawList();
    }

    private async redrawList() {
        this.recalculateWidths();
        this.contRows.forEach((c) => {
            this.contComp.set(c.data.id, c);
        });
        this.oldListLen = this.contRows.length;
    }

    private reportWidths(widths: number[]) {
        widths.forEach((e, i) => {
            if (e > this.colWidths[i]) this.colWidths[i] = e;
        });
    }

    public contestantRowButtonClicked(event: [ContestantRowComponent, string, boolean]) {
        if (event[1] == 'remove') {
            this.modList.deleteById(event[0].data.id);
        }
    }

    private listChanged(): void {
        this.cdr.detectChanges();
        this.selectedItemsAmount = this.countSelected();
    }

    private countSelected(): number {
        return Array.from(this.contComp.values())
            .map((c) => (c !== undefined && c.viewState.selected ? 1 : (0 as number)))
            .reduce((c, t) => c + t);
    }

    public async filteredItemsChangeListener(newvals: any) {
        // this.contComponents = newvals;
        // this.contestants = newvals;
        // console.log(
        //     Array.from(this.contComponents.values())
        //         .map((c) => c.viewState.filtered)
        //         .join(', ')
        // );
        // this.cdr.detectChanges();
        // this.loadVisibleContestants();
    }

    public selChangeListener([id, value]: [number, boolean]): void {
        // this.selectedItemsAmount += value ? +1 : -1;
        this.listChanged();
        // this.cdr.detectChanges();
        // this.contestants.get(id)!.component!.viewState.selected = value;
    }

    // public contestants: Contestant[] = [];
    // private async loadVisibleContestants() {
    //     this.contestants = Array.from(this.contData.values());
    //     // this.contestants = Array.from(this.contData.values()).filter((c) => !this.contComp.get(c.id)?.viewState.filtered);
    // }

    // Todo: maybe do the selection amount tracking through some listener... Couldn't figure it out in a pretty way.
    // The problem is that it needs to be reduced/increased also when adding and removing items!
    public modList = {
        deleteById: (id: number) => {
            this.contComp.delete(id);
            this.contData.delete(id);
            this.listChanged();
        },
        getSelected: (): ContestantRowComponent[] => {
            return Array.from(this.contComp.values()).filter((c) => c.viewState.selected);
        },
        deleteSelected: () => {
            this.modList.getSelected().forEach((c) => this.modList.deleteById(c.data.id));
        },
        selectAll: () => {
            this.contComp.forEach((c) => c.setSelected(true));
            this.listChanged();
        },
        selectNone: () => {
            this.contComp.forEach((c) => c.setSelected(false));
            this.listChanged();
        },
        addNew: () => console.log('ho'),
    };

    public trackByContestant(_: number, cont: KeyValue<number, Contestant>) {
        return cont.value.id;
    }

    private async loadContestants() {
        this.service.getContestants().subscribe({
            next: (resp) => {
                // this.contDataAll = resp.slice(0, 10);
                this.contDataAll = resp;
                this.loadMore();
                // this.loadInPieces();
                // let newMap = new Map<number, Contestant>();
                // resp.forEach((c, i) => i < 50 && newMap.set(c.id, c));
                // resp.forEach((c) => newMap.set(c.id, c));

                // this.contData = newMap;
                // this.loadVisibleContestants();
            },
        });
    }

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll() {
        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) < 300) {
            console.log('MORE');
            this.loadMore();
        }
    }

    // private interval: any;
    // private async loadInPieces() {
    //     this.interval = setInterval(() => {
    //         if (this.contDataAll.length > 0) {
    //             this.loadMore();
    //         } else {
    //             clearInterval(this.interval);
    //         }
    //     }, 10);
    // }

    // private lastRenderedIndex = 0;
    private async loadMore() {
        // let renderIndexLast = this.lastRenderedIndex + 50;
        this.contDataRender = this.contDataRender.concat(this.contDataAll.splice(0, 50));
        console.log('LOAD MORE');
        // this.lastRenderedIndex = renderIndexLast;
        let newMap = new Map<number, Contestant>();
        this.contDataRender.forEach((c) => newMap.set(c.id, c));
        this.contData = newMap;
    }

    private async recalculateWidths() {
        // console.log('recalculateWidths');
        this.cdr.detectChanges();
        this.colWidths = [0, 0, 0, 0, 0];
        this.recalculateWidthsEvent.emit();
        this.setColStartPositions(this.colWidths);
    }

    private async setColStartPositions(widths: number[]) {
        this.document.documentElement.style.setProperty(`--item-col-1`, '0px');
        this.document.documentElement.style.setProperty(`--item-col-2`, this.colGap * 1 + widths.slice(0, 1).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-3`, this.colGap * 2 + widths.slice(0, 2).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-4`, this.colGap * 3 + widths.slice(0, 3).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-5`, this.colGap * 4 + widths.slice(0, 4).reduce((s, t) => s + t) + 'px');
    }
}
