import { Component, Input } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';

@Component({
    selector: 'art-items-list',
    templateUrl: './art-items-list.component.html',
    styleUrls: ['./art-items-list.component.css'],
})
export class ArtItemsListComponent {
    @Input() public artItems: ArtItem[] = [];
    @Input() onThumbnailClick?: (artItem: ArtItem) => void;
    @Input() showThumbnailCheckboxes = true;
    constructor() {}
}
