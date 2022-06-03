import { Component } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css'],
})
export class WinnersComponent extends ContestantListPage {
    protected loadContestants(lottery: Lottery): void {
        super.populateRowData([lottery.winners, lottery.contestants]);
    }
}
