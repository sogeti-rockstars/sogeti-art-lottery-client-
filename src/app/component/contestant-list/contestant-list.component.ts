import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ContestantRowComponent } from 'src/app/component/contestant-row/contestant-row.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { ArtItem } from 'src/app/model/art-item';
import { ClickableElements, ContestantListPage, RowData } from 'src/app/pages/contestant-list-page';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { WinnerService } from 'src/app/service/winner.service';
import { ArtItemsListComponent } from '../art-items-list/art-items-list.component';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';

@Component({
    selector: 'contestant-list-component',
    templateUrl: './contestant-list.component.html',
    styleUrls: ['./contestant-list.component.css'],
})
export class ContestantListComponent implements OnInit, OnDestroy, AfterViewChecked {
    @Input() contestantListParent!: ContestantListPage;
    @Input() enabledRowActions = { edit: false, delete: false, selections: false, buttonRow: false };
    @Input() contestantComparator = (a: RowData, b: RowData) => {
        return a.data!.name.localeCompare(b.data!.name);
    };
    public rowData: RowData[] = [];
    public selectedItemsAmount = 0;
    public readonly filterFunction = (row: RowData, query: string) => {
        row.filtered = row.data === undefined || !row.data!.name.toLowerCase().includes(query.toLowerCase());
        return row.filtered;
    };

    public ClickableElements = ClickableElements;
    public addNewRowData?: RowData;

    @ViewChildren('rowWrapper')
    private colGap = 20;
    private contestantsListChangeSubs!: Subscription;
    private currentExpandedRow?: ContestantRowComponent;

    constructor(
        private authService: AuthService,
        private lotteryService: LotteryService,
        private winnerService: WinnerService,
        private cdr: ChangeDetectorRef,
        private modalService: ModalService,
        private viewContainerRef: ViewContainerRef,
        private matDialog: MatDialog,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        this.contestantsListChangeSubs = this.contestantListParent.contestantsChange.subscribe((data) => {
            data.sort(this.contestantComparator);
            this.rowData = data;
        });
        this.setColWidths([200, 150, 65, 150]);
        if (!this.authService.authenticated) this.enabledRowActions = { buttonRow: false, selections: false, delete: false, edit: false };
    }

    ngOnDestroy(): void {
        this.contestantsListChangeSubs.unsubscribe();
    }

    ngAfterViewChecked(): void {}

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
            this.lotteryService.getAvailableItemsByLotteryId(this.lotteryService.currLotteryId).subscribe({
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
                this.contestantListParent.listManipulation.update(row.data);
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

    private async refreshList() {
        this.cdr.detectChanges();
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
