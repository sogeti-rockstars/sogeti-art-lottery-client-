import { Component } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { Winner } from 'src/app/model/winner';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    winners: Winner[] = [];
    protected loadContestants(contestants: Contestant[]): void {
        if (this.currLottery != undefined)
            this.lotteryService.getWinnersByLotteryId(this.currLottery.id).subscribe((resp) => {
                this.winners = resp;
                super.populateRowData([this.winners, contestants]);
            });
    }
}
