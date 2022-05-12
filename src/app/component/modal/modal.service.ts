import { Injectable, Input, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { ModalComponent } from './modalComponents/modal.component';

@Injectable()
export class ModalService {
    private rootViewContainer!: ViewContainerRef;

    setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    constructor() {}

    loadExistingArtItemModalCard(artItem: ArtItem) {
        const componentRef = this.rootViewContainer.createComponent<ModalComponent>(ModalComponent);
        this.rootViewContainer.clear();
        componentRef.instance.artItem = artItem;
        componentRef.instance.viewItem = true;
        componentRef.instance.openFancyItemCard(artItem);
    }

    loadAddNewArtItemModal() {
        const componentRef = this.rootViewContainer.createComponent<ModalComponent>(ModalComponent);
        this.rootViewContainer.clear();
        componentRef.instance.addItem = true;
        componentRef.instance.openNewItemDialog();
    }

    loadEditArtItemModal(artItem: ArtItem) {
        const componentRef = this.rootViewContainer.createComponent<ModalComponent>(ModalComponent);
        this.rootViewContainer.clear();
        componentRef.instance.editItem = true;
        componentRef.instance.openEditItemDialogImage(artItem);
    }
}
