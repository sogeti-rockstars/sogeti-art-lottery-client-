import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RowData } from 'src/app/pages/contestant-list-page';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: ['./filter-list.component.css'],
})
export class FilterListComponent {
    @Input() public dataList!: RowData[];
    @Input() public filterFunction!: (row: RowData, query: string) => boolean;

    @Output() public listChanged = new EventEmitter<number>();

    public searchForm!: FormGroup;

    private intervalIds: NodeJS.Timeout[] = [];

    constructor() {
        this.searchForm = new FormGroup({ query: new FormControl('', Validators.minLength(2)) });
    }

    public async keyDownFunction(event: any) {
        let query = this.searchForm.get('query')?.value;
        this.filterInChunks(query);
        if (event.code === 'Enter') console.log('enter pressed');
    }

    private async filterInChunks(query: string) {
        let [lastIdxChecked, totalHits] = [0, 0];
        let intervalIdIdx = this.intervalIds.length;

        this.intervalIds.push(
            setInterval(() => {
                [lastIdxChecked, totalHits] = this.filterDataList(query, lastIdxChecked, totalHits);
                //                 console.log(`int: \
                // ${intervalIdIdx} != ${this.intervalIds.length - 1} \
                // (${intervalIdIdx != this.intervalIds.length - 1}):\
                // ${totalHits}`);
                if (intervalIdIdx != this.intervalIds.length - 1) {
                    this.intervalIds.slice(0, -1).forEach((i) => clearInterval(i));
                    return;
                }
                if (this.dataList !== undefined) this.listChanged.emit(totalHits);

                if (lastIdxChecked < 0) {
                    // if (lastIdxChecked < 0 && this.dataList !== undefined) this.listChanged.emit(totalHits);
                    this.intervalIds.forEach((i) => clearInterval(i));
                }
            }, 50)
        );
    }

    private filterDataList(query: string, lastIdxChecked = 0, totalHits = 0) {
        let matchingRows = 0;
        try {
            this.dataList.slice(lastIdxChecked).map((e) => {
                e.filtered = this.filterFunction(e, query);
                if (!e.filtered) {
                    matchingRows++;
                    if (matchingRows == 100) throw new Error('pause...');
                }
                return !e.filtered;
            });
        } catch (e) {
            return [lastIdxChecked + 100, totalHits + 100];
        }
        return [-1, totalHits + matchingRows];
    }
}
