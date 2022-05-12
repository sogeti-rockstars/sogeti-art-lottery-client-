import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
    selector: 'dialog-content-image',
    templateUrl: './dialog-content-image.component.html',
    styleUrls: ['./dialog-content-image.component.css'],
})
export class DialogContentImageComponent {
    @Output() artItemOutput = new EventEmitter<ArtItem>();

    output(artItem: ArtItem) {
        console.log('diaconima' + artItem.itemName);
        this.saveUpdateItem(artItem);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            label: string;
            artItem: ArtItem;
        },
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService
    ) {}

    loadImageUrl(): string {
        return this.itemApiService.getArtItemImageUrl(this.data.artItem.id);
    }

    saveUpdateItem(artItem: ArtItem) {
        console.log('update is' + artItem.itemName);
        this.artItemService.observeUpdateArtItem(artItem).subscribe((data) => {
            console.log(data.id);
        });
        this.artItemOutput.emit(artItem);
    }
}
