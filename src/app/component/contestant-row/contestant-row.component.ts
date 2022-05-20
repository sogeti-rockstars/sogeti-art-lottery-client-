import {
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Contestant } from 'src/app/model/contestant';
import { ContestantsComponent } from 'src/app/pages/contestants/contestants.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-contestant-row',
    templateUrl: './contestant-row.component.html',
    styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit {
    public viewState = { selected: false, expanded: false, inModal: false, filtered: false, colWidths: [] as number[] };
    public reportWidthsSubscription!: Subscription;

    @Input() public data!: Contestant;
    // @Input() public onDestroy!: (srcObj: ContestantRowComponent) => void;
    // @Input() public afterViewInit!: (srcObj: ContestantRowComponent) => void;
    @Input() public light = false;

    @Output() public selectedChanged = new EventEmitter<[number, boolean]>();
    @Output() public elementClicked: EventEmitter<[ContestantRowComponent, string, boolean]> = new EventEmitter();

    @ViewChild('collapsedItems') collapsedItem!: ElementRef<HTMLElement>;
    @ViewChild('fullElement') fullElement!: ElementRef<HTMLElement>;
    @ViewChild('complElement') complElement!: ElementRef<HTMLElement>;

    constructor(
        private dialog: MatDialog,
        private modService: ModalService,
        private vcr: ViewContainerRef,
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        data?: Contestant
    ) {
        if (data !== null) {
            this.data = data!; // When injected from modal service!
            this.viewState.inModal = true;
            this.light = false;
            this.viewState.filtered = false;
        }
    }

    ngAfterViewInit(): void {
        // console.log('1:' + this.data.id + ':' + this.fullElement?.nativeElement?.getBoundingClientRect().height);
        // this.elemHeight = this.fullElement?.nativeElement?.getBoundingClientRect().height + 'px';
        // this.hide(this.fullElement?.nativeElement?.getBoundingClientRect().height);
        // if (this.afterViewInit !== undefined) this.afterViewInit!(this);
        // this.waitForSize();
    }

    ngOnDestroy(): void {
        // if (this.onDestroy !== undefined) this.onDestroy!(this);
    }

    ngOnInit(): void {}
    ngAfterViewChecked(): void {
        // this.hideIfSized();
        // console.log('2:' + this.data.id + ':' + this.fullElement?.nativeElement?.getBoundingClientRect().height);
    }
    ngAfterContentChecked(): void {}

    // @HostListener('window:resize', ['$event'])
    // onResize(event: Event) {
    // (event.target as Window).innerWidth;
    // }

    public toggleColapse(event: Event): void {
        this.viewState.expanded = !this.viewState.expanded;
        // this.widthsDrawn.emit([this, this.getAllColumnWidths()]);
        event?.stopPropagation();
    }

    /** Called by template. No value==toggle, else set to. */
    public setSelected(value?: boolean) {
        if (value === undefined) value = !this.viewState.selected;
        this.viewState.selected = value;
        this.selectedChanged.emit([this.data.id, this.viewState.selected]);
    }

    public buttonHandler(event: Event): void {
        const elem = event.target as Element;
        event.stopPropagation();
        this.elementClicked.emit([this, elem.id, true]);
        if (elem.id == 'expand') this.toggleColapse(event);
        else if (elem.id == 'edit') this.openDefaultModal();
    }

    public openDefaultModal(): void {
        // const component = this.vcr.createComponent<ContestantRowComponent>(ContestantRowComponent);
        // component.instance.viewState.inModal = true;
        // component.instance.data = this.data;
        // this.modService
        //     .loadModal(component, this.vcr)
        //     .afterClosed()
        //     .subscribe(() => {
        //         this.data = component.instance.data;
        //         console.log('Hello');
        //     });

        // Alternative of how to use without service:
        let ref = this.dialog!.open(ContestantRowComponent, { data: this.data });
        ref.afterClosed().subscribe(() => {
            this.data = ref.componentInstance.data;
            console.log(ref.componentInstance.data);
        });
    }

    // private async waitForSize() {
    //     let height = this.fullElement?.nativeElement?.getBoundingClientRect().height;
    //     if (height !== undefined) {
    //         // console.log('height set');
    //         this.elemHeight = height + 'px';
    //         this.viewState.hidden = true;
    //     } else if (!this.viewState.hidden) {
    //         // console.log('run again');
    //         setTimeout(this.waitForSize, 10);
    //     }
    // }

    // public heightSet = false;

    // private async hideIfSized() {
    //     let height = this.fullElement?.nativeElement?.getBoundingClientRect().height;
    // if (!this.heightSet && height !== undefined) {
    //     this.lightElemHeight = height + 'px';
    //     this.light = true;
    //     this.heightSet = true;
    // }
    // }
    //
    // public async unhide() {
    //     this.light = false;
    //     this.lightElemHeight = this.fullElement?.nativeElement?.getBoundingClientRect().height + 'px';
    // }

    @Input() public lightElemHeight?: string;
    public async setLight(val: boolean) {
        // this.lightElemHeight = placeholderHeight!;
        this.light = true;
    }

    public getAllColumnWidths(elem: ElementRef<HTMLElement>): number[] {
        let currElem = elem?.nativeElement.children.item(0);
        let widths = [];
        while (currElem != null) {
            widths.push(currElem.clientWidth);
            currElem = currElem.nextElementSibling;
        }
        return widths;
    }
}
