import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { Contestant } from 'src/app/model/contestant';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent {
    @Input() data!: Contestant;
    @Output() clickEvent: EventEmitter<[Contestant, string, boolean]> = new EventEmitter();
    public selected = false;
    public expanded = false;

    public toggleColapse(event: Event): void {
        event?.stopPropagation();
        window['event']?.stopPropagation();
        event?.preventDefault();
        event?.stopImmediatePropagation();
        console.log(event);
        var target = event.target || event.srcElement || event.currentTarget;
        console.log(target);

        let testVal = event.currentTarget as unknown as MatListOption;
        testVal.disabled = false;
        console.log(testVal.value);
        // testVal!.disabled = true;
        // console.log(testVal);
        this.expanded = !this.expanded;

        this.selected = false;
    }
    public selectedChanged(event: boolean): void {
        this.selected = false;
        window['event']?.stopPropagation();
        console.log(event);
        console.log(window['event']);
    }

    // public checkboxHandler(state?: any): void {
    //     this.clickEvent.emit([this.data, 'checkbox', false]);
    // }

    public buttonHandler(event: Event): void {
        const elem = event.target as Element;
        event.stopPropagation();
        this.clickEvent.emit([this.data, elem.id, true]);
        if (elem.id == 'expand') this.toggleColapse(event);
    }
}
