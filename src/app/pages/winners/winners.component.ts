import { Component } from '@angular/core';
import { Winner } from 'src/app/model/winner';
import { WinnerApiService } from 'src/app/service/api/winner-api.service';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    constructor(private contService: ContestantService, lotteryService: LotteryService, private winnerApiService: WinnerApiService) {
        super(lotteryService);
    }

    override ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined) this.loadContestants(this.lotteryService.currLotteryId);
        super.loadContestantsSubscription = this.lotteryService.lotteryChanged.subscribe((lottery) => {
            this.loadContestants(lottery.id);
        });
    }

    protected loadContestants(lotteryId: number): void {
        this.winnerApiService.getWinningContestantsByLotteryId(lotteryId).subscribe((resp) => this.contestantsChange.emit(resp));
    }
}
