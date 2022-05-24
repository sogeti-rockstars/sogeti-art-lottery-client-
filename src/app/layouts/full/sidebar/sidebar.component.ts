import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppComponent } from 'src/app/app.component';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class AppSidebarComponent implements OnDestroy, OnInit {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    @Output() lotteryEmit: EventEmitter<Lottery[]> = new EventEmitter();
    lotteries: Lottery[] = [];

    @Input() public visible = false;
    @Output() public visibility = new EventEmitter<boolean>();

    constructor(public app: AppComponent, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private lotteryService: LotteryService) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit(): void {
        this.getMenuitem();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    getMenuitem() {
        this.lotteryService.getLotteriesSummary().subscribe((data: Lottery[]) => {
            this.lotteryEmit.emit(data);
            this.lotteries = data;
        });
        console.log('get menu item' + this.lotteries);
    }

    public toggleSideNav() {
        this.visible = !this.visible;
        this.visibility.emit(this.visible);
    }

    public pickLottery(idx: any) {
        console.log(`${this.lotteries[idx].title} ${this.lotteries[idx].id} ${this.lotteries[idx].date.toString()}`);
    }
}
