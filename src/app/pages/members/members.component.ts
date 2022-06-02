import { Component } from '@angular/core';
import { Lottery } from 'src/app/model/lottery';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'appmembers',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent extends ContestantListPage {
    protected loadContestants(lottery: Lottery): void {
        super.populateRowData(lottery.contestants);
        // this.contestantsChange.emit(lottery.contestants);
    }
}
