import { Component, OnInit } from '@angular/core';
import { Winner } from 'src/app/model/winner';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent implements OnInit {
    winners: Winner[] = [];
    constructor(private lotteryService: LotteryService) {}

    ngOnInit(): void {}

    spinTheWheel() {
        this.lotteryService.spinTheWheel(1).subscribe((data: Winner) => {
            this.winners.push(data);
            console.log(data.id);
        });
    }
}
