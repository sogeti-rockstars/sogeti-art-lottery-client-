import { Component } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'appmembers',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent extends ContestantListPage {
    constructor(lotteryService: LotteryService, contestantsService: ContestantService) {
        super(lotteryService, contestantsService);
    }

    protected loadContestants(contestants: Contestant[]): void {
        super.populateRowData(contestants);
    }
}
