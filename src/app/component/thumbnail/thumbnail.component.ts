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

    // Med objekt direkt i metoden
    // loadModal(artItem: ArtItem) {
    //     console.log(artItem.itemName);
    //     const component = this.viewContainerRef.createComponent<FancyImageCardComponent>(FancyImageCardComponent);
    //     component.instance.artItem = artItem;
    //     this.modalService.loadModal(component, this.viewContainerRef);
    // }

    // Med objekt i service
    loadModal(artItem: ArtItem) {
        console.log(artItem.itemName);
        const component = this.viewContainerRef.createComponent<FancyImageCardComponent>(FancyImageCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }

    // Dessa är tillfälliga, för test-syften
    editModal(artItem: ArtItem) {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        component.instance.artItem = artItem;
        this.modalService.loadModal(component, this.viewContainerRef);
    }

    addModal() {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModal(component, this.viewContainerRef);
    }
}
