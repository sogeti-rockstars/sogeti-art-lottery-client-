import { Component, Inject, Input, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';

@Component({
    selector: 'app-fancy-image-card',
    templateUrl: './fancy-image-card.component.html',
    styleUrls: ['./fancy-image-card.component.css'],
})
export class FancyImageCardComponent {
    public label!: string;
    public artItem!: ArtItem;
    public panelClass!: string;
    constructor(private itemApiService: ArtItemApiService, private vcr: ViewContainerRef) {
        this.panelClass = 'custom-dialog-container';
    }

    getVCR(): ViewContainerRef {
        return this.vcr;
    }
    loadImageUrl(): string {
        return this.itemApiService.getArtItemImageUrl(this.artItem.id);
    }
}
