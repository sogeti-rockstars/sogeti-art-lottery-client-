import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';
import { ClickableElements, RowData } from 'src/app/pages/contestant-list-page';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent implements OnInit {
    @Output() public interactionEvent = new EventEmitter<{ comp: ContestantRowComponent; elem: ClickableElements }>();

    @Input() public rowData!: RowData;
    @Output() public rowDataChange = new EventEmitter<RowData>();

    @Input() public enabledRowActions!: { delete: boolean; edit: boolean; selections: boolean; buttonRow: boolean };
    @Input() set index(idx: number) {
        this.rowData.index = idx;
    }

    // Give access to template
    public ClickElems = ClickableElements;

    public contestantForm!: FormGroup;

    private preEditValues?: Map<string, any>;
    private enabledFields = ['id', 'name', 'employeeId', 'email', 'teleNumber', 'office'];

    constructor(public authService: AuthService, private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) data?: Contestant) {
        if (data !== undefined) this.rowData = { data: data!, inModal: true, render: true };
    }

    ngOnInit(): void {
        if (this.rowData === undefined) this.rowData = {};
        if (this.rowData.data === undefined) this.rowData.data = new Contestant();

        this.contestantForm = this.fb.group({
            name: new FormControl({ value: this.rowData.data.name, disabled: true }),
            id: new FormControl({ value: this.rowData.data.id, disabled: true }),
            employeeId: new FormControl({ value: this.rowData.data.employeeId, disabled: true }),
            email: new FormControl({ value: this.rowData.data.email, disabled: true }),
            teleNumber: new FormControl({ value: this.rowData.data.teleNumber, disabled: true }),
            office: new FormControl({ value: this.rowData.data.office, disabled: true }),
        });

        if (this.rowData.inAddNewMode) {
            this.rowData.expanded = true;
            this.rowData.inEditMode = true;
            this.setEditMode(true);
        }
    }

    /**
     * Overlapping HTMLElements call this function and getting their id was awkard when they overlapped like in ( <button><mat-icon></m></b>)
     * so we go with a custom enum....
     * @param element enum value of element clicked.
     * @param event When we want to stop the propagation (because more elements use the same event) */
    clickEventHandler(element: ClickableElements, event?: MouseEvent) {
        event?.stopPropagation();

        switch (element) {
            case ClickableElements.edit:
                this.setEditMode(!this.rowData.inEditMode);
                if (!this.rowData.expanded) this.setExpanded(true);
                break;
            case ClickableElements.acceptNew:
                this.rowData.data = this.contestantForm.value as Contestant;
                this.setEditMode(false);
                this.setExpanded(false);
                break;
            case ClickableElements.acceptEdit:
                this.rowData.data = this.contestantForm.value as Contestant;
                this.setEditMode(false);
                this.setExpanded(false);
                break;
            case ClickableElements.abort:
                this.setExpanded(false);
                break;
            case ClickableElements.expand:
                this.setExpanded();
                break;
            case ClickableElements.artItemPicker:
                break;
        }

        this.interactionEvent.emit({ comp: this, elem: element });
    }

    inputContDataSubmit(event?: MouseEvent) {
        if (this.rowData.inAddNewMode) this.clickEventHandler(ClickableElements.acceptNew, event);
        else this.clickEventHandler(ClickableElements.acceptEdit, event);
    }

    /**
     * @param expanded omit to toggle.
     */
    setExpanded(expanded?: boolean) {
        this.rowData.expanded = expanded !== undefined ? expanded : !this.rowData?.expanded;
        if (!this.rowData.expanded && this.rowData.inEditMode) this.setEditMode(false, true);
    }

    private setEditMode(value: boolean, restore?: boolean) {
        if (value) {
            this.preEditValues = new Map();
            this.enabledFields.forEach((formName) => {
                let formCtrl = this.contestantForm.controls[formName];
                this.preEditValues!.set(formName, formCtrl.value);
                formCtrl.enable();
            });
        } else {
            this.enabledFields.forEach((formName) => {
                let formCtrl = this.contestantForm.controls[formName];
                if (restore) formCtrl.setValue(this.preEditValues!.get(formName));
                formCtrl.disable();
            });
            this.preEditValues = undefined;
        }
        this.rowData.inEditMode = value;
    }

    getAllColumnWidths(elem: ElementRef<HTMLElement>): number[] {
        let currElem = elem?.nativeElement.children.item(0);
        let widths = [];
        while (currElem != null) {
            widths.push(currElem.clientWidth);
            currElem = currElem.nextElementSibling;
        }
        return widths;
    }
}
