import { Component, EventEmitter } from '@angular/core';
import { Winner } from 'src/app/model/winner';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { WinnerService } from 'src/app/service/winner.service';
import { ContestantListPage, RowData } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage {
    contestantComparator = (a: RowData, b: RowData) => {
        return a.winner!.placement - b.winner!.placement;
    };

    readonly animationControlEvent = new EventEmitter<number>();
    buttonShown = false;
    winners: Winner[] = [];

    constructor(lotteryService: LotteryService, contestantsService: ContestantService, winnerService: WinnerService) {
        super(lotteryService, contestantsService);
        this.listManipulation.deleteByIdx = (idx: number) => {
            let removedId = this.rowData.splice(idx, 1)[0];
            if (removedId !== undefined) winnerService.deleteWinner(removedId.data!.id).subscribe((_) => this.loadContestants());
        };
    }

    async spinningAnimationEndHandler() {
        let currLotteryId = this.lotteryService.currLotteryId!;
        this.lotteryService.spinTheWheel(currLotteryId).subscribe((_) => this.loadContestants());
    }

    showButton() {
        this.buttonShown = true;
    }

    spinTheWheel(ev: MouseEvent) {
        ev.stopImmediatePropagation();
        this.animationControlEvent.emit(-1);
    }

    protected loadContestants(): void {
        this.lotteryService.getCurrentWinners()?.subscribe((resp) => {
            this.winners = resp;
            super.populateRowData(this.winners);
        });
    }
}
