import { Component } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    constructor(lotteryService: LotteryService) {
        super(lotteryService);
    }

    protected loadContestants(lottery: Lottery): void {
        this.contestantsChange.emit([lottery.winners, lottery.contestants]);
    }
}
