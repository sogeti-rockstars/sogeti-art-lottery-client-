import { Component, ElementRef, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';

export interface RowData {
    data: Contestant;
    index?: number;
    srcElement?: ClickableElements;
    selected?: boolean;
    expanded?: boolean;
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
export class ContestantRowComponent {
    // implements  AfterViewChecked,OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
    @Output() public interactionEvent = new EventEmitter<RowData>();

    @Output() public rowDataChange = new EventEmitter<RowData>();
    @Input() public rowData!: RowData;

    @Input() set index(idx: number) {
        this.rowData.index = idx;
    }

    // Give access to template
    public ClickElems = ClickableElements;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) data?: Contestant) {
        if (data !== undefined) this.rowData = { data: data!, inModal: true, render: true };
    }

    /**
     * Overlapping HTMLElements call this function and getting their id was awkard when they overlapped like in ( <button><mat-icon></m></b>)
     * so we go with a custom enum....
     * @param element enum value of element clicked.
     * @param event When we want to stop the propagation (because more elements use the same event) */
    public clickEventHandler(element: ClickableElements, event?: MouseEvent) {
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
