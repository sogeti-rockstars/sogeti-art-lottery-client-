import { Component, OnInit } from '@angular/core';
import { Winner } from 'src/app/model/winner';
import { LotteryApiService } from 'src/app/service/api/lottery-api.service';

@Component({
    selector: 'app-lottery-start',
    templateUrl: './lottery-start.component.html',
    styleUrls: ['./lottery-start.component.css'],
})
export class LotteryStartComponent implements OnInit {
    winners: Winner[] = [];
    constructor(private lotteryApiService: LotteryApiService) {}

    ngOnInit(): void {}

    spinTheWheel() {
        this.lotteryApiService.spinTheWheel(1).subscribe((data: Winner) => {
            this.winners.push(data);
            console.log(data.id);
        });
    }
}
