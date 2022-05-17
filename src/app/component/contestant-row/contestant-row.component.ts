import {
    AfterContentChecked,
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Contestant } from 'src/app/model/contestant';
import { ContestantsComponent } from 'src/app/pages/contestants/contestants.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent implements OnInit, AfterContentChecked, OnChanges, AfterViewChecked, OnDestroy {
    @Input() data!: Contestant;

    public selected = false;
    public expanded = false;
    public inModal = false;

    @Output() public selectedChanged = new EventEmitter<[number, boolean]>();

    // On internal element is clicked, e.g: parent needs to be informed of the delete button being clicked
    @Output() elementClicked: EventEmitter<[Contestant, string, boolean]> = new EventEmitter();

    @ViewChild('collapsedItems')
    collapsedItem!: ElementRef<HTMLElement>;

    @Input()
    public parent!: ContestantsComponent;
    private parentSubscription!: Subscription;

    constructor(
        private modService: ModalService,
        private vcr: ViewContainerRef,
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        public data2?: Contestant
    ) {
        // When injected from modal service!
        if (data2 !== null) {
            this.data = data2!;
            this.inModal = true;
        }
    }

    ngAfterViewChecked(): void {}

    ngOnInit(): void {
        this.parentSubscription = this.parent.recalculateWidthsEvent.subscribe((_) => this.parent.reportWidths(this.getAllColumnWidths(this.collapsedItem)));
    }
    ngOnDestroy(): void {
        this.parentSubscription!.unsubscribe();
    }

    ngAfterContentChecked(): void {}

    public getAllColumnWidths(elem: ElementRef<HTMLElement>): number[] {
        let currElem = elem?.nativeElement.children.item(0);
        let widths = [];
        while (currElem != null) {
            widths.push(currElem.clientWidth);
            currElem = currElem.nextElementSibling;
        }
        return widths;
    }

    ngOnChanges(changes: any): void {
        // console.log('changes');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        // (event.target as Window).innerWidth;
    }

    public toggleColapse(event: Event): void {
        this.expanded = !this.expanded;
        // this.widthsDrawn.emit([this, this.getAllColumnWidths()]);
        event?.stopPropagation();
    }

    /** Called by template. No value==toggle, else set to. */
    public setSelected(value?: boolean) {
        if (value === undefined) value = !this.selected;
        this.selected = value;
        this.selectedChanged.emit([this.data.id, this.selected]);
    }

    public buttonHandler(event: Event): void {
        const elem = event.target as Element;
        event.stopPropagation();
        this.elementClicked.emit([this.data, elem.id, true]);
        if (elem.id == 'expand') this.toggleColapse(event);
        else if (elem.id == 'edit') this.openDefaultModal();
    }

    public openDefaultModal(): void {
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

        // Alternative of how to use without service:
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
