import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent extends ContestantListPage implements OnInit {
    show = true; // Used to restart the animation by hiding it very temporarily.

    contestants: Contestant[] = [];
    winners: Contestant[] = [];

    constructor(private contService: ContestantService, lotteryService: LotteryService, private cdr: ChangeDetectorRef) {
        super(lotteryService);
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    spinningAnimationEndHandler() {
        while (this.winners.length * 0.25 <= this.contestants.length) {
            this.winners.push(this.getRandomContestant());
            this.contestantsChange.emit(this.winners);
        }
    }

    spinTheWheel() {
        this.animationRestart();
    }

    /**
     * Restart the animation
     */
    private animationRestart() {
        this.show = false;
        this.cdr.detectChanges();
        this.show = true;
    }

    protected loadContestants(lotteryId: number): void {
        this.contService.getContestants(lotteryId).subscribe((resp) => {
            this.contestants = resp;
            this.winners = [];
        });
    }

    private getRandomContestant() {
        let max = this.contestants.length - 1;
        let randomId = Math.floor(Math.random() * max);
        let randomCont = this.contestants.splice(randomId, 1);
        return randomCont[0];
    }
}
