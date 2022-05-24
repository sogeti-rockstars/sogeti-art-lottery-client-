import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';

export interface RowData {
    data: Contestant;
    index?: number;
    srcElement?: ClickableElements;
    selected?: boolean;
    expanded?: boolean;
    inEditMode?: boolean;
    inModal?: boolean;
    filtered?: boolean;
    render?: boolean;
    colWidths?: number[];
    height?: number;
}

export enum ClickableElements {
    remove,
    edit,
    expand,
    checkbox,
    body,
}

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

        this.contestantForm = this.fb.group({
            name: new FormControl({ value: this.rowData.data.name, disabled: true }),
            id: new FormControl({ value: this.rowData.data.id, disabled: true }),
            employeeId: new FormControl({ value: this.rowData.data.employeeId, disabled: true }),
            email: new FormControl({ value: this.rowData.data.email, disabled: true }),
            teleNumber: new FormControl({ value: this.rowData.data.teleNumber, disabled: true }),
            office: new FormControl({ value: 'BACKENDWIP', disabled: true }),
        });
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
        if (element == ClickableElements.edit) {
            this.rowData.inEditMode = this.rowData.inEditMode === undefined || !this.rowData.inEditMode;
            this.setEditMode(this.rowData.inEditMode!);
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
