import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { LotteryService } from '../service/lottery.service';

/**
 * Base class that all pages which use the ContestantListComponent should extend.
 * This was done so that we can decide externally which list to use when displaying contestants, i.e. the "Winners" page
 * uses different business login than the "Members" page to decide which contestants to display.
 *
 * Child classes implement the loadContestants method which in turn has to emit the list through contestantsChange
 * EventEmitter. This is read by the Contestant component.
 */
@Component({ template: '' })
export abstract class ContestantListPage implements OnInit, OnDestroy {
    @Output() contestantsChange = new EventEmitter<Contestant[] | [Winner[], Contestant[]]>();

    private loadContestantsSubscription?: Subscription;

    constructor(public lotteryService: LotteryService) {}

    ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined)
            this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => this.loadContestants(lottery));

        this.loadContestantsSubscription = this.lotteryService.lotteryChanged.subscribe((lottery) => this.loadContestants(lottery));
    }

    ngOnDestroy(): void {
        if (this.loadContestantsSubscription !== undefined) {
            this.loadContestantsSubscription.unsubscribe();
            this.loadContestantsSubscription = undefined;
        }
    }

    protected abstract loadContestants(lottery: Lottery): void;
}
