import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-contestant-sel-buttons',
    templateUrl: './contestant-sel-buttons.component.html',
    styleUrls: ['./contestant-sel-buttons.component.css'],
})
export class ContestantSelButtonsComponent implements OnInit {
    @Input() selectedItemsAmount: number = 0;

    @Input() selectAll = (): void => {};
    @Input() selectNone = (): void => {};
    @Input() deleteSelected = (): void => {};

    @Input() addNew = (): void => {};

    constructor() {}

    ngOnInit(): void {}
}
