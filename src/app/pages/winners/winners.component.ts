import { Component } from '@angular/core';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { WinnerService } from 'src/app/service/winner.service';
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

    constructor(lotteryService: LotteryService, contestantsService: ContestantService, winnerService: WinnerService) {
        super(lotteryService, contestantsService);
        this.listManipulation.deleteByIdx = (idx: number) => {
            let removedId = this.rowData.splice(idx, 1)[0];
            if (removedId !== undefined) winnerService.deleteWinner(removedId.winner!.id).subscribe((_) => this.loadContestants());
        };
    }

    protected loadContestants(): void {
        this.lotteryService.getCurrentWinners()?.subscribe((resp) => super.populateRowData(resp));
    }
}
