import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-contestant-sel-buttons',
    templateUrl: './contestant-sel-buttons.component.html',
    styleUrls: ['./contestant-sel-buttons.component.css'],
})
export class ContestantSelButtonsComponent implements OnInit {
    @Input() selectedItemsAmount: number = 0;

    constructor() {}

    ngOnInit(): void {}
}
