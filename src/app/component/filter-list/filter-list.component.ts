import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: ['./filter-list.component.css'],
})
export class FilterListComponent implements OnInit {
    @Input() public dataList: any[] | undefined;
    @Input() public filterFunction!: (obj: any, query: string) => boolean;

    @Input() public dataMap: Map<number, any> | undefined;
    @Input() public mapFunction!: (obj: any, query: string) => void;

    @Output() public listChanged = new EventEmitter<any>();

    public searchQuery = '';
    public searchForm!: FormGroup;

    constructor() {
        this.searchForm = new FormGroup({
            query: new FormControl('', Validators.minLength(2)),
        });
    }

    ngOnInit(): void {}

    public keyDownFunction(event: any) {
        let searchQuery = this.searchForm.get('query')?.value;

        if (this.dataList !== undefined) this.listChanged.emit(this.filterList(searchQuery, this.dataList));
        else if (this.dataMap !== undefined) this.listChanged.emit(this.filterMap(searchQuery, this.dataMap));
        else throw new ReferenceError('lacking data');

        if (event.code === 'Enter') console.log('enter pressed');

        // let list = this.dataList !== undefined ? this.dataList : this.dataMap !== undefined ? Array.from(this.dataMap.values()) : undefined;
        // if (list === undefined)
        // let visibleItems = list.filter((val, _) => this.filterFunction(val, this.searchQuery));
        // if (this.dataMap !== undefined)
        // else this.listChanged.emit(visibleItems);
    }

    private filterMap(query: string, dataMap: Map<number, any>) {
        dataMap.forEach((val, _) => this.mapFunction(val, query));
        console.log(dataMap);
        return dataMap;
    }

    private filterList(query: string, dataList: any[]) {
        return dataList.filter((val, _) => this.filterFunction(val, query));
    }
}
