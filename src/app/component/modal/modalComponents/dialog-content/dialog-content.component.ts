import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
    selector: 'dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {
    @Output() artItemOutput = new EventEmitter<ArtItem>();
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            label: string;
        },
        private artItemService: ArtItemService
    ) {}

    output(artItem: ArtItem) {
        console.log('diacon' + artItem.itemName);
        this.saveAddItem(artItem);
    }

    saveAddItem(artItem: ArtItem) {
        console.log('add is' + artItem.itemName);
        this.artItemService.observeAddArtItem(artItem).subscribe((data) => {
            console.log(data.id);
        });
        this.artItemOutput.emit(artItem);
    }
}
