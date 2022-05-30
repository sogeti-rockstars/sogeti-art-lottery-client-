import { Component, OnInit } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { Winner } from 'src/app/model/winner';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent implements OnInit {
    winners: Contestant[] = [];
    contestants: Contestant[] = [];

    constructor(private lotteryService: LotteryService, private contestantService: ContestantService) {}

    ngOnInit(): void {
        this.lotteryService.lotteryChanged.subscribe((lott) => {
            this.contestantService.getContestants(lott.id).subscribe((conts) => (this.contestants = conts));
        });
    }

    spinTheWheel() {
        this.winners.push(this.getRandomContestant());
    }

    private getRandomContestant() {
        let max = this.contestants.length - 1;
        let randomId = Math.floor(Math.random() * max);
        let randomCont = this.contestants.splice(randomId, 1);
        return randomCont[0];
    }
}
