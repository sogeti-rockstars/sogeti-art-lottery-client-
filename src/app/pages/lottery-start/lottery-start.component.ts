import { Component, EventEmitter } from '@angular/core';
import { Winner } from 'src/app/model/winner';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage {
    readonly animationControlEvent = new EventEmitter<number>();
    buttonShown = false;
    winners: Winner[] = [];

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
