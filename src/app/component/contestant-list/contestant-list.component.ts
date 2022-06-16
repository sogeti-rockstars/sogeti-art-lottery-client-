import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { HostListener, Inject, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { ClickableElements, ContestantListPage, RowData } from 'src/app/pages/contestant-list-page';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
    selector: 'contestant-list-component',
    templateUrl: './contestant-list.component.html',
    styleUrls: ['./contestant-list.component.css'],
})
export class ContestantListComponent implements OnInit, OnDestroy, AfterViewChecked {
    @Input() contestantListParent!: ContestantListPage;
    @Input() editable = false;
    public rowData: RowData[] = [];
    public selectedItemsAmount = 0;
    public readonly filterFunction = (row: RowData, query: string) => {
        row.filtered = row.data === undefined || !row.data!.name.toLowerCase().includes(query.toLowerCase());
        return row.filtered;
    };
    public get unrenderedRowsHeight() {
        return this.unrenderedRowsHeight$;
    }

    public ClickableElements = ClickableElements;
    public addNewRowData?: RowData;

    @ViewChildren('rowWrapper')
    private contRows!: QueryList<ElementRef<HTMLDivElement>>;
    private unrenderedRowsHeight$ = '10px';
    private rowRenderMargin = 500;
    private firstRenderRowCount = 20;
    private lastWinScrollY = 0;
    private firstRenderFinished = false;
    private colGap = 20;
    private contestantsListChangeSubs!: Subscription;

    constructor(
        public cdr: ChangeDetectorRef,
        private modService: ModalService,
        private vcr: ViewContainerRef,
        @Inject(DOCUMENT) private document: Document,
        private contestantService: ContestantService
    ) {}

    ngOnInit(): void {
        this.contestantsListChangeSubs = this.contestantListParent.contestantsChange.subscribe((data) => {
            data.slice(0, this.firstRenderRowCount).forEach((rd) => (rd.render = true));
            this.rowData = data;
            this.rowData.sort((a, b) => a.data!.name.localeCompare(b.data!.name));
        });
        this.setColWidths([200, 150, 65, 150]);
    }

    ngOnDestroy(): void {
        this.contestantsListChangeSubs.unsubscribe();
    }

    ngAfterViewChecked(): void {
        if (!this.firstRenderFinished && this.contRows.length > 0) {
            this.firstRenderFinished = true;
            this.onFinishedRendering();
        }
    }

    public async filteredItemsChangeListener(_matches: number) {
        this.refreshList();
    }

    /** Tracker for *ngFor in template. Increases performance.*/
    public trackByContestant(_idx: number, row: RowData) {
        return row.data?.id;
    }

    public openDefaultModal(idx: number): void {
        const component = this.vcr.createComponent<ContestantRowComponent>(ContestantRowComponent);
        component.instance.rowData = Object.assign({}, this.rowData[idx]);
        component.instance.rowData.inModal = true;
        this.modService
            .loadModal(component, this.vcr)
            .afterClosed()
            .subscribe(() => (this.rowData[idx].data = component.instance.rowData.data));
    }

    /* EVENT LISTENERS: */
    public interactionEventListener = (_idx: number, row?: RowData, srcElement?: ClickableElements) => {
        let element = srcElement === undefined ? row!.srcElement : srcElement;
        switch (element) {
            case ClickableElements.body:
            case ClickableElements.expand:
                this.rowData[_idx].expanded = !this.rowData[_idx].expanded;
                break;
            case ClickableElements.edit:
                // handled by cont-row.
                break;
            case ClickableElements.checkbox:
                this.rowData[_idx].selected = !row!.selected;
                this.selectedItemsAmount += !row!.selected ? 1 : -1;
                break;
            case ClickableElements.remove:
                this.contestantListParent.listManipulation.deleteByIdx(_idx);
                break;
            case ClickableElements.selectAll:
                this.rowData.forEach((c) => (c.selected = true));
                this.selectedItemsAmount = this.rowData.length;
                break;
            case ClickableElements.selectNone:
                this.rowData.forEach((c) => (c.selected = false));
                this.selectedItemsAmount = 0;
                break;
            case ClickableElements.removeSelected:
                this.contestantListParent.listManipulation.deleteSelected();
                this.selectedItemsAmount = 0;
                break;
            case ClickableElements.addNew:
                this.addNewRowData = { inAddNewMode: true };
                break;
            case ClickableElements.acceptNew:
                this.contestantListParent.listManipulation.addNew(this.addNewRowData!.data!);
                this.addNewRowData = undefined;
                break;
            case ClickableElements.acceptEdit:
                this.contestantService.updateContestant(row?.data!).subscribe((r) => {
                    console.log(row?.data);
                    row!.data = r;
                    console.log(row?.data);
                });
                break;
            case ClickableElements.abort:
                this.addNewRowData = undefined;
                break;
            default:
                throw new Error('Unknown enum ' + row?.srcElement + ' was sent to clickEventHandler!!! ');
        }
        this.refreshList();
    };

    ////////////////////////////////
    // Just-in-time rendering stuff:
    // (Todo: Ottos idea, we might be able to do this using pure CSS! Investigate!)

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

    /**
     * Called on scroll, window resize, and list changed events.
     * Looks at which rows are visible inside the window and marks them for rendering */
    // Todo: cancel previous execution when called again? Maybe we can do this with CSS!!!
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
                return { idx: +e.nativeElement.id, t: rect.top, b: rect.bottom };
            })
            .filter(({ idx: idx, t: _, b: __ }) => !this.rowData[idx].filtered) // Only check unfiltered
            .forEach(({ idx: idx, t: top, b: bottom }) => {
                this.rowData[idx].render = bottom > topLimit && top < bottomLimit;
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
}
