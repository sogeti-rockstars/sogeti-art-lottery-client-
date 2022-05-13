import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
    @Input() cssClass: string;
    @Input() artItem!: ArtItem;

    constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef) {
        this.cssClass = 'thumbnailImg';
    }
    loadModal(artItem: ArtItem) {
        console.log(artItem.itemName);
        this.modalService.setRootViewContainerRef(this.viewContainerRef);
        this.modalService.loadExistingArtItemModalCard(artItem);
    }
}
