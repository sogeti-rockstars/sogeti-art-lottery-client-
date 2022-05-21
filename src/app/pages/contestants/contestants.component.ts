import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, OnInit, ChangeDetectorRef, Component, ElementRef, EventEmitter } from '@angular/core';
import { HostListener, Inject, Output, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClickableElements, ContestantRowComponent, RowData } from 'src/app/component/contestant-row/contestant-row.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit, AfterViewChecked {
    public rowData: RowData[] = [];
    public selectedItemsAmount = 0;

    @ViewChildren('rowWrapper') private contRows!: QueryList<ElementRef<HTMLDivElement>>;
    private rowRenderMargin = 0;
    private firstRenderRowCount = 20;
    private lastWinScrollY = 0;
    private firstRenderFinished = false;
    private unrenderedRowsHeight$ = '10px';
    get unrenderedRowsHeight() {
        return this.unrenderedRowsHeight$;
    }

    private colGap = 20;

    readonly filterFunction = (row: RowData, query: string) => (row.filtered = !row.data.name.toLowerCase().includes(query.toLowerCase()));

    constructor(
        private service: ContestantService,
        public cdr: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: Document,
        private dialog: MatDialog,
        private modService: ModalService,
        private vcr: ViewContainerRef
    ) {}

    ngAfterViewChecked(): void {
        if (!this.firstRenderFinished && this.contRows.length > 0) {
            this.firstRenderFinished = true;
            this.onFinishedRendering();
        }
    }

    ngOnInit(): void {
        this.loadContestants();
        this.setColWidths([200, 150, 65, 150]);
    }

    public async filteredItemsChangeListener(_newvals: RowData[]) {
        this.refreshList();
    }

    public trackByContestant(_idx: number, row: RowData) {
        return row.data.id;
    }

    /* EVENT LISTENERS: */

    public openDefaultModal(idx: number): void {
        const component = this.vcr.createComponent<ContestantRowComponent>(ContestantRowComponent);
        component.instance.rowData = Object.assign({}, this.rowData[idx]);
        component.instance.rowData.inModal = true;
        this.modService
            .loadModal(component, this.vcr)
            .afterClosed()
            .subscribe(() => (this.rowData[idx].data = component.instance.rowData.data));

        // Alternative of how to use without service:
        // let ref = this.dialog!.open(ContestantRowComponent, { data: this.rowData.data });
        // ref.afterClosed().subscribe(() => {
        //     this.rowData.data = ref.componentInstance.rowData.data;
        //     console.log(ref.componentInstance.rowData.data);
        // });
    }

    public interactionEventListener(_idx: number, row: RowData) {
        switch (row.srcElement) {
            case ClickableElements.body:
            case ClickableElements.expand:
                this.rowData[_idx].expanded = !this.rowData[_idx].expanded;
                break;
            case ClickableElements.edit:
                this.openDefaultModal(_idx);
                break;
            case ClickableElements.checkbox:
                this.rowData[_idx].selected = !row.selected;
                this.selectedItemsAmount += !row.selected ? 1 : -1;
                break;
            case ClickableElements.remove:
                this.listManipulation.deleteByIdx(_idx);
                break;
            default:
                throw new Error('Unknown enum ' + row.srcElement + ' was sent to clickEventHandler!!! ');
        }
        this.refreshList();
    }

    // Todo: maybe do the selection amount tracking through some listener... Couldn't figure it out in a pretty way.
    // The problem is that it needs to be reduced/increased also when adding and removing items!
    public listManipulation = {
        deleteByIdx: (idx: number) => this.rowData.splice(idx, 1),
        deleteById: (id: number) => {
            let idx = this.rowData.find((c) => c.data.id == id)?.index;
            if (idx !== undefined) this.listManipulation.deleteByIdx(idx);
        },
        getSelected: (): RowData[] => {
            return this.rowData.filter((r) => r.selected);
        },
        deleteSelected: () => {
            this.rowData = this.rowData.filter((c) => !c.selected);
            this.selectedItemsAmount = 0;
            this.refreshList();
        },
        selectAll: () => {
            this.rowData.forEach((c) => (c.selected = true));
            this.selectedItemsAmount = this.rowData.length;
        },
        selectNone: () => {
            this.rowData.forEach((c) => (c.selected = false));
            this.selectedItemsAmount = 0;
        },
        addNew: () => console.log('ho'),
    };

    ////////////////////////////////
    // Just-in-time rendering stuff:

    /**
     * Called by ngAfterViewChecked after rowWrapper ElementRefs are found for the first time.
     * By doing so we can get the rendered size of the elements and a standard height for unredered rows. */
    private onFinishedRendering() {
        this.unrenderedRowsHeight$ = this.contRows.get(0)?.nativeElement?.getBoundingClientRect().height! + 'px';
        this.cdr.detectChanges(); // We get 'ExpressionChangedAfterItHasBeenCheckedError' otherwise
    }

    private async refreshList() {
        this.cdr.detectChanges();
        this.markVisibleForRendering(true).finally(() => this.cdr.detectChanges());
    }

    // Todo: cancel previous execution when called again?
    /**
     * Called on scroll and window resize event. Looks at which rows are visible inside the window and
     * marks them for rendering */
    @HostListener('window:resize', ['false', '$event']) // for window scroll events
    @HostListener('window:scroll', ['false', '$event']) // for window scroll events
    private async markVisibleForRendering(force: boolean = false, _event?: any) {
        let winScrollY = window.scrollY + window.innerHeight; // Treat resize events as scrolling.
        // Ignore tiny scrolls
        if (!force && Math.abs(winScrollY - this.lastWinScrollY) < 10) return;
        this.lastWinScrollY = winScrollY;

        // Y grows downwars, kinda confusting....
        // elem ┌───┐╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ e.top    ~= -5       bottom > top
        //    ┌─┼───┼───┐╌╌ TopLimit = 0-extra                     botLim > topLim
        //    │ └───┘   │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ e.bottom ~= +5
        // win│         │
        //    │ ┌───┐   │╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ e.top    ~= winH-5
        //    └─┼───┼───┘╌╌ BotLimit = winHgt + extra
        // elem └───┘╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ e.bottom ~= winH+5

        let [topLimit, bottomLimit] = [-this.rowRenderMargin, window.innerHeight + this.rowRenderMargin];

        this.contRows
            .map((e) => {
                let rect = e.nativeElement.getBoundingClientRect();
                return { id: +e.nativeElement.id, t: rect.top, b: rect.bottom };
            })
            .forEach(({ id: id, t: top, b: bottom }) => {
                this.rowData[id].render = bottom > topLimit && top < bottomLimit;
            });
    }

    private async loadContestants() {
        this.service.getContestants().subscribe({
            next: (resp: Contestant[]) => resp.forEach((c, i) => this.rowData.push({ data: c, render: i < this.firstRenderRowCount })),
            error: (error: any) => console.log(error),
            complete: () => console.log('Http got response.'),
        });
    }

    // Variable width things
    private async setColWidths(widths: number[]) {
        this.document.documentElement.style.setProperty(`--item-col-1`, '0px');
        this.document.documentElement.style.setProperty(`--item-col-2`, this.colGap * 1 + widths.slice(0, 1).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-3`, this.colGap * 2 + widths.slice(0, 2).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-4`, this.colGap * 3 + widths.slice(0, 3).reduce((s, t) => s + t) + 'px');
        this.document.documentElement.style.setProperty(`--item-col-5`, this.colGap * 4 + widths.slice(0, 4).reduce((s, t) => s + t) + 'px');
    }

    // @Output() public recalculateWidthsEvent = new EventEmitter<void>();
    // private colWidths = [0, 0, 0, 0, 0];
    // private reportWidths(widths: number[]) {
    //     widths.forEach((e, i) => {
    //         if (e > this.colWidths[i]) this.colWidths[i] = e;
    //     });
    // }
    // public onContestantRowAfterViewInit = (contRow: ContestantRowComponent) => {
    //     contRow.reportWidthsSubscription = this.recalculateWidthsEvent.subscribe(() => {
    //         if (contRow.rowData.filtered) return;
    //         this.reportWidths(contRow.getAllColumnWidths(contRow.collapsedItem));
    //     });
    // };

    // public onContestantRowDestroy = (contRow: ContestantRowComponent) => {
    // contRow.reportWidthsSubscription!.unsubscribe();
    // };
    // type contViewData = { data: Contestant; filtered: Boolean; component?: ContestantRowComponent };
    // this.contComponents = new Set();
    // public filterSetFunction = (val: ContestantRowComponent, query: string): void => {
    //     val.rowData.filtered = !val.data.name.toLowerCase().includes(query.toLowerCase());
    // };
}
