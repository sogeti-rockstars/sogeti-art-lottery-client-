import { Component, Input, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { FancyImageCardComponent } from '../card/fancy-image-card/fancy-image-card.component';
import { ArtItemFormComponent } from '../form/art-item-form/art-item-form.component';
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
        const component = this.viewContainerRef.createComponent<FancyImageCardComponent>(FancyImageCardComponent);
        component.instance.artItem = artItem;
        // console.log(component.instance);
        this.modalService.loadModal(component, this.viewContainerRef);
    }

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
