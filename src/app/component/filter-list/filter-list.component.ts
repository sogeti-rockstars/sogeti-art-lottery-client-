import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RowData } from '../contestant-row/contestant-row.component';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: ['./filter-list.component.css'],
})
export class FilterListComponent {
    @Input() public dataList!: RowData[];
    @Input() public filterFunction!: (row: RowData, query: string) => boolean;

    @Output() public listChanged = new EventEmitter<RowData[]>();

    public searchForm!: FormGroup;

    constructor() {
        this.searchForm = new FormGroup({ query: new FormControl('', Validators.minLength(2)) });
    }

    public keyDownFunction(event: any) {
        let searchQuery = this.searchForm.get('query')?.value;
        this.dataList.forEach((e) => (e.filtered = this.filterFunction(e, searchQuery)));
        if (this.dataList !== undefined) this.listChanged.emit(this.dataList);

        if (event.code === 'Enter') console.log('enter pressed');
    }
}
