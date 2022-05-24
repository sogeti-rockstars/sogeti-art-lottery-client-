import { ApplicationRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class AppSidebarComponent implements OnInit {
    get visible() {
        return this.visible$;
    }
    @Input()
    set visible(value: boolean) {
        this.visible$ = value;
        this.visibleChange.emit(this.visible$);
        if (this.visible$) this.listenClicks();
        else this.unListenClicks();
    }

    @Output()
    public visibleChange = new EventEmitter<boolean>();
    private visible$ = false;

    private unListenClicksFunction?: () => void;

    private lotteries$: Lottery[] = [];
    get lotteries() {
        return this.lotteries$;
    }

    constructor(private lotteryService: LotteryService, private elemRef: ElementRef, private renderer: Renderer2, private app: ApplicationRef) {}

    ngOnInit(): void {
        this.lotteryService.getLotteriesSummary().subscribe((data: Lottery[]) => (this.lotteries$ = data));
    }

    public pickLottery(idx: any) {
        this.lotteryService.setCurrentLottery(idx);
        this.visible = false;
    }

    private clickListen(event: any) {
        if (!this.elemRef.nativeElement.contains(event.target)) {
            console.log('clicked outside!');
            this.visible = false;
        }
    }

    private listenClicks() {
        this.unListenClicks();
        this.unListenClicks = this.renderer.listen(this.app.components[0].location.nativeElement, 'click', (event) => this.clickListen(event));
    }

    private unListenClicks() {
        if (this.unListenClicksFunction) this.unListenClicksFunction.call(this);
    }
}
