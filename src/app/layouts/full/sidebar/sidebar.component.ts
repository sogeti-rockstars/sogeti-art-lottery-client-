import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';
import { CreateLotteryComponent } from 'src/app/pages/create-lottery/create-lottery.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class AppSidebarComponent implements OnInit {
    @Output() sidebarVisibleClicked = new EventEmitter<void>();
    @Input() visible = false;

    get lotteries() {
        return this.lotteries$;
    }

    private lotteries$: Lottery[] = [];

    constructor(private lotteryService: LotteryService, public authService: AuthService) {}

    ngOnInit(): void {
        console.log('init');
        this.lotteryService.getLotteriesSummary().subscribe((data: Lottery[]) => (this.lotteries$ = data));
    }

    public pickLottery(idx: any) {
        this.lotteryService.setCurrentLottery(idx);
        this.sidebarVisibleClicked.emit();
    }
}

// Todo: autoclose sidebar when clicking on side.
// the code below works only when viewing the contestant component for some reason...
//
// import { ApplicationRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
// constructor(private lotteryService: LotteryService, private elemRef: ElementRef, private renderer: Renderer2, private app: ApplicationRef) {}
// this.sidebarVisibleClicked.subscribe(() => this.listenClicks());
// private unListenClicksFunction?: () => void;
// private listenClicks() {
//     this.unListenClicks();
//     if (this.visible == true)
//         this.unListenClicks = this.renderer.listen(this.app.components[0].location.nativeElement, 'click', (event) => this.clickListen(event));
//     else console.log('not subscribing');
// }
// private unListenClicks() {
//     if (this.unListenClicksFunction) this.unListenClicksFunction.call(this);
// }
// private clickListen(event: any) {
//     if (!this.elemRef.nativeElement.contains(event.target)) {
//         console.log('clicked outside!');
//         this.visible = false;
//         this.sidebarVisibleClicked.emit();
//     } else console.log('clicked inside!');
// }
