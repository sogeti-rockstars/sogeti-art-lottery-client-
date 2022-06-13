import { Component } from '@angular/core';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    protected loadContestants(): void {
        this.lotteryService.getCurrentWinners()?.subscribe((resp) => super.populateRowData(resp));
    }
}
