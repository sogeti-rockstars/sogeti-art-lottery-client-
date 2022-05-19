import {
    AfterContentChecked,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contestant } from 'src/app/model/contestant';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestantRowComponent implements OnInit, AfterContentChecked, OnChanges {
    @Input() data!: Contestant;

    public selected = false;
    public expanded = false;
    public inModal = false;

    @Input() public columnPositions: number[] = [];
    @Output() widthsDrawn: EventEmitter<[ContestantRowComponent, number[]]> = new EventEmitter();
    @ViewChild('contInfoItems') contInfoItems!: ElementRef<HTMLElement>;

    // On internal element is clicked, e.g: parent needs to be informed of the delete button being clicked
    @Output() elementClicked: EventEmitter<[Contestant, string, boolean]> = new EventEmitter();

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

    ngOnInit(): void {}

    ngAfterContentChecked(): void {
        this.widthsDrawn.emit([this, this.getAllColumnWidths()]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('changes' + changes);
        this.widthsDrawn.emit([this, this.getAllColumnWidths()]);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        // Todo: recalculate widths on resize event
        (event.target as Window).innerWidth;
    }

    private getAllColumnWidths(): number[] {
        let elem = this.contInfoItems?.nativeElement.children.item(0);
        let widths = [];
        while (elem != null) {
            widths.push(elem.clientWidth);
            elem = elem.nextElementSibling;
        }
        return widths;
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
