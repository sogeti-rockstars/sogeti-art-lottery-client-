import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { ArtItem } from 'src/app/model/art-item';
import { ClickableElements, ContestantListPage, RowData } from 'src/app/pages/contestant-list-page';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { WinnerService } from 'src/app/service/winner.service';
import { ArtItemDetailsComponent } from '../art-item-details/art-item-details.component';
import { ArtItemsListComponent } from '../art-items-list/art-items-list.component';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';

@Component({
    selector: 'contestant-list-component',
    templateUrl: './contestant-list.component.html',
    styleUrls: ['./contestant-list.component.css'],
})
export class ContestantListComponent implements OnInit, OnDestroy, AfterViewChecked {
    @Input() contestantListParent!: ContestantListPage;
    @Input() editable = false;
    @Input() contestantComparator = (a: RowData, b: RowData) => {
        return a.data!.name.localeCompare(b.data!.name);
    };
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
    private currentExpandedRow?: ContestantRowComponent;

    constructor(
        public cdr: ChangeDetectorRef,
        private modalService: ModalService,
        private viewContainerRef: ViewContainerRef,
        private lotteryService: LotteryService,
        private winnerService: WinnerService,
        private matDialog: MatDialog,
        @Inject(DOCUMENT) private document: Document,
        private contestantService: ContestantService
    ) {}

    ngOnInit(): void {
        this.contestantsListChangeSubs = this.contestantListParent.contestantsChange.subscribe((data) => {
            data.slice(0, this.firstRenderRowCount).forEach((rd) => (rd.render = true));
            this.rowData = data;
            this.rowData.sort(this.contestantComparator);
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
        const component = this.viewContainerRef.createComponent<ContestantRowComponent>(ContestantRowComponent);
        component.instance.rowData = Object.assign({}, this.rowData[idx]);
        component.instance.rowData.inModal = true;
        this.modalService
            .loadModal(component, this.viewContainerRef)
            .afterClosed()
            .subscribe(() => (this.rowData[idx].data = component.instance.rowData.data));
    }

    openItemModal(artItem: ArtItem) {
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }

    openItemPickerModal(contRowComp: ContestantRowComponent) {
        if (this.lotteryService.currLotteryId != null)
            this.lotteryService.getArtItemsByLotteryId(this.lotteryService.currLotteryId).subscribe({
                error: (error: HttpErrorResponse) => {
                    alert(error.message);
                },
                next: (resp: ArtItem[]) => {
                    const component = this.viewContainerRef.createComponent<ArtItemsListComponent>(ArtItemsListComponent);
                    component.instance.artItems = resp;
                    console.log(resp);
                    component.instance.onThumbnailClick = (artItem: ArtItem) => {
                        let winner = contRowComp.rowData.winner!;
                        winner.lotteryItem = artItem;
                        winner.contestantId = contRowComp.rowData.data?.id!;
                        console.log(winner);
                        this.winnerService.updateWinner(winner).subscribe();
                        this.matDialog.closeAll();
                    };
                    this.modalService.loadModalWithPanelClass(component, 'custom-thumbnail', this.viewContainerRef);
                },
            });
    }

    openItemPickerModal2() {}
    // artItemClicked(artItemComp: ArtItemDetailsComponent, matDialog: MatDialog) {
    //     matDialog.open(ArtItemDetailsComponent, { data: artItemComp.data, panelClass: 'art-item-details-card' });
    // }

    public buttonEventListener = (elem: ClickableElements) => this.interactionEventListener(-1, { comp: undefined, elem: elem });

    /* EVENT LISTENERS: */
    public interactionEventListener = (idx: number, iEvent: { comp: any; elem: ClickableElements }) => {
        let row = iEvent?.comp?.rowData;
        let element = iEvent.elem;
        switch (element) {
            case ClickableElements.body:
            case ClickableElements.expand: // Emitted here only so we can close other rows.
                this.unexpandLastRow(iEvent.comp);
                break;
            case ClickableElements.edit:
                this.unexpandLastRow(iEvent.comp);
                break;
            case ClickableElements.checkbox:
                this.rowData[idx].selected = !row!.selected;
                this.selectedItemsAmount += !row!.selected ? 1 : -1;
                break;
            case ClickableElements.remove:
                this.contestantListParent.listManipulation.deleteByIdx(idx);
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
                this.contestantService.updateContestant(row?.data!).subscribe((r) => (row!.data = r));
                break;
            case ClickableElements.abort:
                this.addNewRowData = undefined;
                break;
            case ClickableElements.artItemPicker:
                this.openItemPickerModal(iEvent.comp);
                break;
            default:
                throw new Error('Unknown enum ' + row?.srcElement + ' was sent to clickEventHandler!!! ');
        }
        this.refreshList();
    };

    // This isn't just a feature, removing it without other changes will introduce bugs.
    // At the very least we need to check other rows are not in edit mode...
    private unexpandLastRow(emittingRowComp: ContestantRowComponent) {
        if (this.currentExpandedRow !== undefined && this.currentExpandedRow !== emittingRowComp) {
            this.currentExpandedRow.setExpanded(false);
        }
        this.currentExpandedRow = emittingRowComp.rowData.expanded ? emittingRowComp : undefined;
    }

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
