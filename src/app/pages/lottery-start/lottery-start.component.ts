import { Component, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Winner } from 'src/app/model/winner';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage {
    winners: Winner[] = [];
    public readonly animationControlEvent = new EventEmitter<number>();

    async spinningAnimationEndHandler() {
        let currLotteryId = this.lotteryService.currLotteryId!;
        let repetitions = Math.floor(this.contestants.length * 0.25 - this.winners.length);
        let observables: Observable<Winner>[] = [];
        if (repetitions > 0) {
            [...Array(repetitions)].forEach((_) => {
                observables.push(this.lotteryService.spinTheWheel(currLotteryId));
            });
        }

        combineLatest(observables).subscribe((_) => this.loadContestants());
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
