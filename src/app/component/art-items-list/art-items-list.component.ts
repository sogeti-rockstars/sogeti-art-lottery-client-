import { AfterContentChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';

@Component({
    selector: 'art-items-list',
    templateUrl: './art-items-list.component.html',
    styleUrls: ['./art-items-list.component.css'],
})
export class ArtItemsListComponent {
    @Input() public artItems: ArtItem[] = [];
    constructor(private app: AppComponent) {}
}
