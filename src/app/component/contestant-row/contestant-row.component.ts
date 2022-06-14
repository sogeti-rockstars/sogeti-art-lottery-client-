import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { Contestant } from 'src/app/model/contestant';
import { ClickableElements, RowData } from 'src/app/pages/contestant-list-page';
import { AuthService } from 'src/app/service/auth.service';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { WinnerService } from 'src/app/service/winner.service';
import { ArtItemDetailsComponent } from '../art-item-details/art-item-details.component';
import { ArtItemsListComponent } from '../art-items-list/art-items-list.component';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent implements OnInit {
    @Output() public interactionEvent = new EventEmitter<RowData>();

    @Output() public rowDataChange = new EventEmitter<RowData>();
    @Input() public rowData!: RowData;

    @Input() public editable = false;
    @Input() set index(idx: number) {
        this.rowData.index = idx;
    }

    // Give access to template
    public ClickElems = ClickableElements;

    public contestantForm!: FormGroup;

    constructor(
        public authService: AuthService,
        private lotteryService: LotteryService,
        private contestantService: ContestantService,
        private winnerService: WinnerService,
        private matDialog: MatDialog,
        private vcr: ViewContainerRef,
        private modalService: ModalService,
        private fb: FormBuilder,
        private viewContainerRef: ViewContainerRef,
        @Optional() @Inject(MAT_DIALOG_DATA) data?: Contestant
    ) {
        if (data !== undefined) this.rowData = { data: data!, inModal: true, render: true };
    }

    ngOnInit(): void {
        // if (this.rowData.index! < 2) { // I am leaving this. useful when making changes.
        //     this.rowData.expanded = true;
        //     if (this.rowData.index! == 0) this.rowData.inEditMode = true;
        // }

        if (this.rowData === undefined) this.rowData = {};
        if (this.rowData.data === undefined) this.rowData.data = new Contestant();

        this.contestantForm = this.fb.group({
            name: new FormControl({ value: this.rowData.data.name, disabled: true }),
            id: new FormControl({ value: this.rowData.data.id, disabled: true }),
            employeeId: new FormControl({ value: this.rowData.data.employeeId, disabled: true }),
            email: new FormControl({ value: this.rowData.data.email, disabled: true }),
            teleNumber: new FormControl({ value: this.rowData.data.teleNumber, disabled: true }),
            office: new FormControl({ value: 'BACKENDWIP', disabled: true }),
        });

        if (this.rowData.inAddNewMode) {
            this.rowData.expanded = true;
            this.rowData.inEditMode = true;
            this.rowData.expanded = true;
            this.setEditMode(true);
        }
    }

    openItemModal(artItem: ArtItem) {
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }

    openItemPickerModal() {
        if (this.lotteryService.currLotteryId != null)
            this.lotteryService.getArtItemsByLotteryId(this.lotteryService.currLotteryId).subscribe({
                error: (error: HttpErrorResponse) => {
                    alert(error.message);
                },
                next: (resp: ArtItem[]) => {
                    const component = this.vcr.createComponent<ArtItemsListComponent>(ArtItemsListComponent);
                    component.instance.artItems = resp;
                    component.instance.onThumbnailClick = (artItem: ArtItem) => {
                        let winner = this.rowData.winner!;
                        winner.lotteryItem = artItem;
                        winner.contestantId = this.rowData.data?.id!;
                        console.log(winner);
                        this.winnerService.updateWinner(winner).subscribe();
                        this.matDialog.closeAll();
                    };
                    this.modalService.loadModalWithPanelClass(component, 'custom-thumbnail', this.vcr);
                },
            });
    }

    artItemClicked(artItemComp: ArtItemDetailsComponent) {
        console.log('hi' + artItemComp.data.itemName);
        this.matDialog.open(ArtItemDetailsComponent, { data: artItemComp.data, panelClass: 'art-item-details-card' });
    }

    onSubmit(contestant: Contestant) {
        this.contestantService.updateContestant(contestant).subscribe((resp) => (this.rowData.data = resp));
    }

    setEditMode(value: boolean) {
        if (value) ['id', 'name', 'employeeId', 'email', 'teleNumber', 'office'].forEach((f) => this.contestantForm.controls[f].enable());
        else ['id', 'name', 'employeeId', 'email', 'teleNumber', 'office'].forEach((f) => this.contestantForm.controls[f].disable());
    }

    /**
     * Overlapping HTMLElements call this function and getting their id was awkard when they overlapped like in ( <button><mat-icon></m></b>)
     * so we go with a custom enum....
     * @param element enum value of element clicked.
     * @param event When we want to stop the propagation (because more elements use the same event) */
    public clickEventHandler(element: ClickableElements, event?: MouseEvent) {
        switch (element) {
            case ClickableElements.edit:
                this.rowData.inEditMode = this.rowData.inEditMode === undefined || !this.rowData.inEditMode;
                this.setEditMode(this.rowData.inEditMode!);
                if (this.rowData.inEditMode && !this.rowData.expanded) this.rowData.expanded = true;
                break;
            case ClickableElements.accept:
                this.rowData.data = this.contestantForm.value as Contestant;
                break;
        }

        event?.stopPropagation();
        let iEvent = Object.assign({ srcElement: element }, this.rowData);
        this.interactionEvent.emit(iEvent);
    }

    public getAllColumnWidths(elem: ElementRef<HTMLElement>): number[] {
        let currElem = elem?.nativeElement.children.item(0);
        let widths = [];
        while (currElem != null) {
            widths.push(currElem.clientWidth);
            currElem = currElem.nextElementSibling;
        }
        return widths;
    }
}
