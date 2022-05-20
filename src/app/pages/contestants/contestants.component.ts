import { DOCUMENT, KeyValue } from '@angular/common';
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
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
    public contDataNotRendered: Contestant[] = [];

    // public contData = new Map<number, [boolean, Contestant]>();
    public contDataMap = new Map<number, number>();
    public contData: [boolean, boolean, Contestant][] = [];
    public contComp = new Map<number, ContestantRowComponent>();

    public selectedItemsAmount = 0;

    private colWidths = [0, 0, 0, 0, 0];
    private colGap = 20;

    @Output() public recalculateWidthsEvent = new EventEmitter<void>();

    @ViewChildren('contRow') contRows!: QueryList<ContestantRowComponent>;
    @ViewChildren('contRowCont') contRowConts!: QueryList<any>;

    public fakeItems = { before: [] as number[], after: [] as number[], center: [] as number[] };

    // public onContestantRowAfterViewInit = (contRow: ContestantRowComponent) => {
    //     contRow.reportWidthsSubscription = this.recalculateWidthsEvent.subscribe(() => {
    //         if (contRow.viewState.filtered) return;
    //         this.reportWidths(contRow.getAllColumnWidths(contRow.collapsedItem));
    //     });
    // };

    // public onContestantRowDestroy = (contRow: ContestantRowComponent) => {
    // contRow.reportWidthsSubscription!.unsubscribe();
    // };

    public filterMapFunction = (val: ContestantRowComponent, query: string) => {
        val.viewState.filtered = !val.data.name.toLowerCase().includes(query.toLowerCase());
    };

    // type contViewData = { data: Contestant; filtered: Boolean; component?: ContestantRowComponent };
    // this.contComponents = new Set();
    // public filterSetFunction = (val: ContestantRowComponent, query: string): void => {
    //     val.viewState.filtered = !val.data.name.toLowerCase().includes(query.toLowerCase());
    // };

    constructor(private service: ContestantService, public cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {}

    ngAfterContentInit(): void {
        // console.log('ngAfterContentInit');
    }

    private firstRenderFinished = false;
    ngAfterViewChecked(): void {
        if (!this.firstRenderFinished && this.contRows.length > 0) {
            this.firstRenderFinished = true;
            this.onFinishedRendering();
        }
    }

    ngAfterViewInit(): void {}

    ngOnInit(): void {
        this.loadContestants();
        this.setColStartPositions([200, 150, 65, 150]);
    }

    ngAfterContentChecked(): void {}

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
        setTimeout(() => {
            this.hideUnhideRows();
        }, 10);

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

    // Todo: maybe do the selection amount tracking through some listener... Couldn't figure it out in a pretty way.
    // The problem is that it needs to be reduced/increased also when adding and removing items!
    public modList = {
        deleteById: (id: number) => {
            this.contComp.delete(id);
            this.contData.splice(this.contDataMap.get(id)! - 1, 1);
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

    // public trackByContestant(_: number, cont: KeyValue<number, [boolean, Contestant]>) {
    public trackByContestant(_: number, cont: [boolean, boolean, Contestant]) {
        return cont[2].id;
    }

    private prevRowsInView: number[] = [];

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll() {
        this.hideUnhideRows();
        // console.log(this.detectRowsInScreen2().join(', '));
        // if (document.body.scrollHeight - (window.innerHeight + window.scrollY) < 300) {
        // this.loadMore();
        // }
    }

    private async hideUnhideRows() {
        let [hidden, shown] = [[] as number[], [] as number[]];
        let rowsInView = this.detectRowsInScreen();
        rowsInView.forEach((r) => {
            let idx = this.contDataMap.get(r)!;
            let elem = this.contData[idx];
            if (elem === undefined) console.log(r);
            else elem[0] = true;
            shown.push(r);
        });

        let diff = this.prevRowsInView.filter((e) => !rowsInView.includes(e));
        diff.forEach((r) => {
            let idx = this.contDataMap.get(r)!;
            let elem = this.contData[idx];
            if (elem === undefined) console.log(r);
            else elem[0] = false;
            hidden.push(r);
        });

        this.prevRowsInView = rowsInView;
    }

    private visRowDetectionMargin = 0;

    private detectRowsInScreen() {
        let winHgt = window.innerHeight;
        let [botLimit, topLimit] = [-this.visRowDetectionMargin, winHgt + this.visRowDetectionMargin];

        let rowsNotInView = Array.from(this.contRowConts);
        let rowsInView: number[] = [];

        Array.from(document.documentElement.getElementsByClassName('cont-row-cont')).forEach((c, i) => {
            let rect = c.getBoundingClientRect();
            if (rect.bottom >= botLimit && rect.top <= topLimit) rowsInView.push(+rowsNotInView[i]?.nativeElement?.id);
        });
        return rowsInView;
    }

    public rowsLightHeight? = '10px';
    private onFinishedRendering() {
        this.rowsLightHeight = this.contRows.get(0)?.complElement?.nativeElement?.getBoundingClientRect().height! + 'px';
        this.cdr.detectChanges();
        console.log(`detected height: ${this.rowsLightHeight}`);
        setTimeout(() => this.hideUnhideRows(), 100);
        Array.from(this.contRows).forEach((c) => this.contComp.set(c.data.id, c));
    }

    private async loadContestants() {
        this.service.getContestants().subscribe({
            next: (resp) => {
                resp.forEach((c, i) => {
                    this.contData.push([i < 15, true, c]);
                    this.contDataMap.set(c.id, i);
                    // this.contData.set(c.id, [i < 15, c]);
                });
            },
        });
    }

    private async setColStartPositions(widths: number[]) {
        this.document.documentElement.style.setProperty(`--item-col-1`, '0px');
        this.document.documentElement.style.setProperty(`--item-col-2`, this.colGap * 1 + widths.slice(0, 1).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-3`, this.colGap * 2 + widths.slice(0, 2).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-4`, this.colGap * 3 + widths.slice(0, 3).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-5`, this.colGap * 4 + widths.slice(0, 4).reduce((s, t) => s + t) + 'px');
    }
}

/*
class WtfMate {
    public contDataRender: Contestant[] = [];
    public contDataNotRendered: Contestant[] = [];

    public contData = new Map<number, [boolean, Contestant]>();
    public contComp = new Map<number, ContestantRowComponent>();

    public selectedItemsAmount = 0;

    private colWidths = [0, 0, 0, 0, 0];
    private colGap = 20;

    @Output() public recalculateWidthsEvent = new EventEmitter<void>();

    @ViewChildren('contRow') contRows!: QueryList<ContestantRowComponent>;
    @ViewChildren('contRowCont') contRowConts!: QueryList<any>;

    private cdr!: ChangeDetectorRef;
    public fakeItems = { before: [] as number[], after: [] as number[], center: [] as number[] };

    private async loadMore() {
        console.log('MORE');
        this.contDataRender = this.contDataRender.concat(this.contDataNotRendered.splice(0, 50));
        // this.contDataRender = this.contDataNotRendered;
        let newMap = new Map<number, [boolean, Contestant]>();
        this.contDataRender.forEach((c) => newMap.set(c.id, [true, c]));
        this.contData = newMap;
    }

    // private oldListLen = 0;
    private async redrawList() {
        this.recalculateWidths();
        this.contRows.forEach((c) => {
            this.contComp.set(c.data.id, c);
            // console.log(c.elemHeight);
        });
        // this.oldListLen = this.contRows.length;
    }

    private async setColStartPositions(widths: number[]) {}
    private async recalculateWidths() {
        // console.log('recalculateWidths');
        this.cdr.detectChanges();
        this.colWidths = [0, 0, 0, 0, 0];
        this.recalculateWidthsEvent.emit();
        this.setColStartPositions(this.colWidths);
    }

    private visRowDetectionMargin = 0;
    private prevScrollY = 0;
    private interval: any;

    private async loadInPieces() {
        this.interval = setInterval(() => {
            if (this.contDataNotRendered.length > 0) {
                if (this.contDataNotRendered.length < 50) {
                    this.contDataRender = this.contDataRender.concat(this.contDataNotRendered);
                    this.contDataNotRendered = [];
                } else {
                    this.contDataRender = this.contDataRender.concat(this.contDataNotRendered.splice(0, 50));
                }
                let newMap = new Map<number, [boolean, Contestant]>();
                this.contDataRender.forEach((c) => newMap.set(c.id, [true, c]));
                this.contData = newMap;
                console.log('piece');
            } else {
                clearInterval(this.interval);
            }
        }, 100);
    }

    private detectScrollDir(): boolean {
        let currScrollY = Math.floor(window.scrollY);
        let scrollDirDown = currScrollY >= this.prevScrollY;
        this.prevScrollY = currScrollY;
        return scrollDirDown;
    }

    private prevRowIdsInView: number[] = [];
    private detectRowsInScreen2() {
        if (this.detectScrollDir()) {
            var fakeRowsApprCls = 'fake-item-post';
            var fakeRowsLeaveCls = 'fake-item-pre';
            var fakeRowsApproaching = this.fakeItems.center.concat(this.fakeItems.after);
            var fakeRowsLeaving = this.fakeItems.before;
        } else {
            var fakeRowsApprCls = 'fake-item-pre';
            var fakeRowsLeaveCls = 'fake-item-post';
            var fakeRowsApproaching = this.fakeItems.before.concat(this.fakeItems.center);
            var fakeRowsLeaving = this.fakeItems.after;
        }

        let winHgt = window.innerHeight;
        let [botLimit, topLimit] = [-this.visRowDetectionMargin, winHgt + this.visRowDetectionMargin];

        let rowsInView: number[] = [];

        Array.from(document.documentElement.getElementsByClassName(fakeRowsApprCls)).forEach((c, i) => {
            let rect = c.getBoundingClientRect();
            if (rect.bottom >= botLimit && rect.top <= topLimit) rowsInView.push(fakeRowsApproaching[i]);
        });
        // console.log(rowsInView.map((r) => r.data.id).join(', '));
        this.prevRowIdsInView = rowsInView;
        this.fakeItems.center = rowsInView;
        return rowsInView;
    }

    private detectRowsInScreen3() {
        // let [totPxl, winHgt, topPxl] = [Math.floor( document.body.scrollHeight ), Math.floor window.innerHeight, window.scrollY];
        let [totPxl, winHgt, topPxl] = [Math.floor(document.body.scrollHeight), Math.floor(window.innerHeight), Math.floor(window.scrollY)];
        let btmPxl = topPxl + winHgt;

        let windowRange = [topPxl, btmPxl];
        let preScrRange = [0, topPxl];
        let pstScrRange = [btmPxl, totPxl];

        console.log(`pre: [${preScrRange.join(', ')}]\nwin: [${windowRange.join(', ')}] (${winHgt})\npst: [${pstScrRange.join(', ')}]`);

        let rows = Array.from(this.contRowConts);
        let res: string[] = [];
        let inView: number[] = [];
        Array.from(document.documentElement.getElementsByClassName('cont-row')).forEach((c, i) => {
            let r = c.getBoundingClientRect();
            let [h, t, b] = [Math.floor(r.height), Math.floor(r.top), Math.floor(r.bottom)];
            res.push(`[${t},${b}], (${h})`);

            // if (this.coordinatesInScreen({ srt: t, end: b }, { srt: topPxl, end: btmPxl })) inView.push(rows[i].data.id);
            if (b >= 0 && t <= winHgt) inView.push(rows[i].data.id);
        });
        // console.log(res.join(', '));
        console.log(inView.join(', '));
    }

    private coordinatesInScreen(elem: { srt: number; end: number }, scrn: { srt: number; end: number }, extra?: number): boolean {
        if (extra != undefined) scrn = { srt: scrn.srt + extra, end: scrn.end + extra };

        let compRes = [elem.srt > scrn.srt, elem.srt > scrn.end, elem.end > scrn.srt, elem.end > scrn.end];
        return !compRes.every((e) => e == compRes[0]);

        // for ( boolean )
        // compRes.forEach(r=>{break;})
        // console.log(compRes.join(', '));

        // if (elem.end > scrn.srt && elem.srt < scrn.end) return true;

        // console.log(elem.srt);

        // return false;
    }

    // private lastRenderedIndex = 0;
    private async loadOne() {
        this.contDataRender = this.contDataRender.concat(this.contDataNotRendered.splice(0, 20));
        // this.contDataRender = this.contDataNotRendered;
        let newMap = new Map<number, [boolean, Contestant]>();
        this.contDataRender.forEach((c) => {
            newMap.set(c.id, [true, c]);
        });
        this.contData = newMap;
    }
}
*/
