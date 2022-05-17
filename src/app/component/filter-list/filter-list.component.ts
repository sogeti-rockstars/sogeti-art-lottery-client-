import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: ['./filter-list.component.css'],
})
export class FilterListComponent implements OnInit {
    @Input()
    public dataList!: any[];
    @Input() public filterFunction!: (obj: any) => boolean;
    @Output() public listChanged = new EventEmitter<any[]>();

    public searchQuery = '';
    public searchForm!: FormGroup;

    constructor() {}

    ngOnInit(): void {}

    public keyDownFunction(event: any) {
        this.searchQuery = this.searchForm.get('query')?.value;
        let visibleItems = this.dataList.filter((val, _) => this.filterFunction(val));
        if (event.code === 'Enter') console.log('enter pressed');
        this.listChanged.emit(visibleItems);
    }
}
