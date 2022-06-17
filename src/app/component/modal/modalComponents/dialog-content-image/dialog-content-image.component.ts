import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        this.saveUpdateItem(artItem);
        this.dialogRef.close();
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            label: string;
            artItem: ArtItem;
        },
        private dialogRef: MatDialogRef<DialogContentImageComponent>,
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService
    ) {}

    loadImageUrl(): string {
        return this.itemApiService.getArtItemImageUrl(this.data.artItem.id!);
    }

    saveUpdateItem(artItem: ArtItem) {
        this.artItemService.observeUpdateArtItem(artItem).subscribe((_) => {});
        this.artItemOutput.emit(artItem);
    }
}
