import { Component, Input } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';

@Component({
    selector: 'art-items-list',
    templateUrl: './art-items-list.component.html',
    styleUrls: ['./art-items-list.component.css'],
})
export class ArtItemsListComponent {
    @Input() set artItems(artItems: ArtItem[]) {
        this.artItems$ = artItems.sort((a, b) => a.id - b.id);
    }
    get artItems() {
        return this.artItems$;
    }

    @Input() onThumbnailClick?: (artItem: ArtItem) => void;
    @Input() showThumbnailCheckboxes = true;

    private artItems$: ArtItem[] = [];
    constructor() {}
}
