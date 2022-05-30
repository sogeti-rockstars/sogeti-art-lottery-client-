import { Component } from '@angular/core';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    constructor(private contService: ContestantService, lotteryService: LotteryService) {
        super(lotteryService);
    }

    protected loadContestants(lotteryId: number): void {
        this.contService.getContestants(lotteryId).subscribe((resp) => this.contestantsChange.emit(resp));
    }
}
