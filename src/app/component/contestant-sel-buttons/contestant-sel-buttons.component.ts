import { Component, Input, OnInit } from '@angular/core';
import { ClickableElements } from 'src/app/pages/contestant-list-page';

@Component({
    selector: 'app-contestant-sel-buttons',
    templateUrl: './contestant-sel-buttons.component.html',
    styleUrls: ['./contestant-sel-buttons.component.css'],
})
export class ContestantSelButtonsComponent implements OnInit {
    @Input() selectedItemsAmount: number = 0;

    @Input() interactionEventListener!: (_: any, __: any, el: ClickableElements) => void;

    ClickableElements = ClickableElements;

    constructor() {}

    ngOnInit(): void {}
}
