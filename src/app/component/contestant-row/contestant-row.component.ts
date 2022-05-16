import { Component, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';
import { AltModalService } from 'src/app/service/alt-modal.service';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent {
    @Input() data!: Contestant;
    // On internal element is clicked, e.g: parent needs to be informed of the delete button being clicked
    @Output() elementClicked: EventEmitter<[Contestant, string, boolean]> = new EventEmitter();

    public selected = false;
    public expanded = false;
    // public hidden = false;  // Is it possible? e.g. when the user writes a search query to filter the results
    public inModal = false; // Todo: make a layout for when the component is in a modal

    @ViewChild('firstContainer', { read: ViewContainerRef }) firstContainer!: ViewContainerRef;
    @ViewChild('myTemplate') template!: TemplateRef<ContestantRowComponent>;

    constructor(
        private modalService: AltModalService,
        private modService: ModalService,
        private vcr: ViewContainerRef,
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

    public toggleColapse(event: Event): void {
        this.expanded = !this.expanded;
        event?.stopPropagation();
    }

    /** Called by template. No value==toggle, else set to. */
    public setSelected(value?: boolean) {
        if (value === undefined) value = !this.selected;
        this.selected = value;
    }

    /** Todo: make an eventEmitter? Called */
    public selectedChanged(bEvent?: boolean, event?: Event): void {
        console.log('selectedChanged');
        console.log(bEvent!);
        console.log(event!);
    }

    public buttonHandler(event: Event): void {
        const elem = event.target as Element;
        event.stopPropagation();
        this.elementClicked.emit([this.data, elem.id, true]);
        if (elem.id == 'expand') this.toggleColapse(event);
        else if (elem.id == 'edit') this.openDefaultModal();
    }

    openDefaultModal(): void {
        const component = this.vcr.createComponent<ContestantRowComponent>(ContestantRowComponent);
        component.instance.inModal = true;
        component.instance.data = this.data;
        this.modService
            .loadModal(component, this.vcr)
            .afterClosed()
            .subscribe(() => {
                this.data = component.instance.data;
                console.log('Hello');
            });

        // let ref = this.dialog!.open(ContestantRowComponent, { data: this.data });
        // ref.afterClosed().subscribe(() => {
        //     this.data = ref.componentInstance.data;
        //     console.log(ref.componentInstance.data);
        // });
    }

    // Todo: fix so that columns are aligned aligned. This might be one way
    // constructor(@Optional() public table: MatTable<any>, private cdRef: ChangeDetectorRef) {}
    // @ViewChild(MatColumnDef) columnDef!: MatColumnDef;
    // private _name!: string;
    // @Input()
    // get name(): string {
    //     return this._name;
    // }
    // set name(name: string) {
    //     this._name = name;
    //     this.columnDef.name = name;
    // }
    // if (this.table) {
    //     this.cdRef.detectChanges();
    //     this.table.addColumnDef(this.columnDef);
    // }
    // public matListClicked(event: Event): void {
    //     event.stopImmediatePropagation();
    //     event.preventDefault();
    //     event.stopPropagation();
    //     window['event']?.stopPropagation();
    //     window['event']?.preventDefault();
    //     window['event']?.stopImmediatePropagation();
    //     this.selected = false;
    //     console.log('hey');
    // }
}
