import { Component, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';
import { AltModalService } from 'src/app/service/alt-modal.service';

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
<<<<<<< HEAD
    // public hidden = false;  // Is it possible? e.g. when the user writes a search query to filter the results
    public inModal = false; // Todo: make a layout for when the component is in a modal

    @ViewChild('firstContainer', { read: ViewContainerRef }) firstContainer!: ViewContainerRef;
    @ViewChild('myTemplate') template!: TemplateRef<ContestantRowComponent>;

    constructor(
        private modalService: AltModalService,
        // private vcf: ViewContainerRef,
        private dialog?: MatDialog,
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        public data2?: Contestant
    ) {
        console.log(data2);
        if (data2 !== null) {
            this.data = data2!;
            this.inModal = true;
        }
    }
=======
>>>>>>> origin/dev

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
        else if (elem.id == 'edit') this.openDefaultModal();
    }

    openDefaultModal(): void {
        let ref = this.dialog!.open(ContestantRowComponent, { data: this.data });
        ref.afterClosed().subscribe(() => {
            this.data = ref.componentInstance.data;
            console.log(ref.componentInstance.data);
        });

        // this.modalService.showModal(this.dialog!, this.data, () => {
        //     console.log('modal closed');
        //     // this.data =
        // });
    }
}
