import { Component, Input, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
    @Input() cssClass = 'default-thumbnail-card';
    @Input() artItem!: ArtItem;
    @Input() onClickOverride?: (artItem: ArtItem) => void;
    @Input() showCheckbox = false;

    constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef) {}

    thumbnailClickHandler() {
        if (this.onClickOverride === undefined) this.loadModal(this.artItem);
        else this.onClickOverride(this.artItem);
    }

    loadModal(artItem: ArtItem) {
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }
}
