import { Component } from '@angular/core';
import { ContestantListPage, RowData } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    contestantComparator = (a: RowData, b: RowData) => {
        return a.winner!.placement - b.winner!.placement;
    };

    protected loadContestants(): void {
        this.lotteryService.getCurrentWinners()?.subscribe((resp) => super.populateRowData(resp));
    }
}
