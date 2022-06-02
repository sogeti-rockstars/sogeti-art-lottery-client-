import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';
import { ClickableElements, RowData } from 'src/app/pages/contestant-list-page';

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

    constructor(private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) data?: Contestant) {
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

    onSubmit(contestant: Contestant) {
        console.log(contestant);
    }

    setEditMode(value: boolean) {
        if (value) ['name', 'employeeId', 'email', 'teleNumber', 'office'].forEach((f) => this.contestantForm.controls[f].enable());
        else ['name', 'employeeId', 'email', 'teleNumber', 'office'].forEach((f) => this.contestantForm.controls[f].disable());
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
