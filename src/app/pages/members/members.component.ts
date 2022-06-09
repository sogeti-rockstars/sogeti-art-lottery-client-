import { Component } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';
import { ContestantListPage } from '../contestant-list-page';

@Component({
    selector: 'appmembers',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent extends ContestantListPage {
    protected loadContestants(contestants: Contestant[]): void {
        super.populateRowData(contestants);
    }
}
