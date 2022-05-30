import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { AppComponent } from 'src/app/app.component';
import { ArtItemFormComponent } from '../form/art-item-form/art-item-form.component';
import { ModalComponent } from '../modal/modalComponents/modal.component';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ModalService } from '../modal/modal.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
    @Input() id!: number;
    @Input() cssClass: string;
    @Input() artItem!: ArtItem;

    loadModal(artItem: ArtItem) {
        console.log(artItem.itemName);
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }
    constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef, public authService: AuthService) {
        this.cssClass = 'thumbnailImg';
    }
    addModal() {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModal(component, this.viewContainerRef);
    }
}
