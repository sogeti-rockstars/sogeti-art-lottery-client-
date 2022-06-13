import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

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
        this.lotteryService.setCurrentLotteryIndex(idx);
        this.sidebarVisibleClicked.emit();
    }
}
