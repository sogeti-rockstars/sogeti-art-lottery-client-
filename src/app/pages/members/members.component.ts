import { Component } from '@angular/core';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'appmembers',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent extends ContestantListPage {
    constructor(private contService: ContestantService, lotteryService: LotteryService) {
        super(lotteryService);
    }

    protected loadContestants(lotteryId: number): void {
        this.contService.getContestants(lotteryId).subscribe((resp) => this.contestantsChange.emit(resp));
    }
}
