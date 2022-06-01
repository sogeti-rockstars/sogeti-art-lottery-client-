import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Lottery } from 'src/app/model/lottery';
import { Winner } from 'src/app/model/winner';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage {
    public readonly animationControlEvent = new EventEmitter<number>();

    private currLottery!: Lottery;

    constructor(lotteryService: LotteryService, private cdr: ChangeDetectorRef) {
        super(lotteryService);
    }

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
            this.lotteryService.getLottery(currLotteryId).subscribe((lottery) => {
                this.currLottery = lottery;
                this.contestantsChange.emit([this.currLottery.winners, this.currLottery.contestants]);
            });
        });
    }

    spinTheWheel(ev: MouseEvent) {
        ev.stopImmediatePropagation();
        this.animationControlEvent.emit(-1);
    }

    protected loadContestants(lottery: Lottery): void {
        this.currLottery = lottery;
        this.contestantsChange.emit([this.currLottery.winners, this.currLottery.contestants]);
    }
}
