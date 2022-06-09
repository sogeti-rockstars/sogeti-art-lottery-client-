import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-lottery',
    templateUrl: './edit-lottery.component.html',
    styleUrls: ['./edit-lottery.component.css'],
})
export class EditLotteryComponent implements OnInit {
    lotId!: number;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getLottery();
    }

    getLottery(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        console.log(id);
        this.lotId = id;
    }
}
