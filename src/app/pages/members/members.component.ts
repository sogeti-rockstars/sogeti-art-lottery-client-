import { Component } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'appmembers',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent extends ContestantListPage {
    constructor(lotteryService: LotteryService) {
        super(lotteryService);
    }

    protected loadContestants(lottery: Lottery): void {
        this.contestantsChange.emit(lottery.contestants);
    }
}
