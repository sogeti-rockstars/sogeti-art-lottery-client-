import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent {
    @Input() data!: Contestant;
    @Output() clickEvent: EventEmitter<[Contestant, string, boolean]> = new EventEmitter();

    checkboxHandler(state: boolean): void {
        this.clickEvent.emit([this.data, 'checkbox', state]);
    }

    buttonHandler(event: Event): void {
        const elem = event.target as Element;
        event.stopPropagation();
        this.clickEvent.emit([this.data, elem.id, true]);
    }
}
