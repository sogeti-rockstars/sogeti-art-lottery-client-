import { Component, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { Winner } from 'src/app/model/winner';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage {
    public readonly animationControlEvent = new EventEmitter<number>();

    async spinningAnimationEndHandler() {
        let currLotteryId = this.lotteryService.currLotteryId!;
        let repetitions = Math.floor(this.currLottery.contestants.length * 0.25 - this.currLottery.winners.length);
        let observables: Observable<Winner>[] = [];
        if (repetitions > 0) {
            [...Array(repetitions)].forEach((_) => {
                observables.push(this.lotteryService.spinTheWheel(currLotteryId));
            });
        }

        combineLatest(observables).subscribe((_) => {
            this.contestantsService.getContestants().subscribe((contestants) => this.loadContestants(contestants));
        });
    }

    spinTheWheel(ev: MouseEvent) {
        ev.stopImmediatePropagation();
        this.animationControlEvent.emit(-1);
    }

    protected loadContestants(contestants: Contestant[]): void {
        super.populateRowData([this.currLottery.winners, this.currLottery.contestants]);
    }
}
