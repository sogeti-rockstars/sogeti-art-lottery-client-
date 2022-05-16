import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogContentComponent } from './modalComponents/dialog-content/dialog-content.component';
import { ModalComponent } from './modalComponents/modal.component';

@Injectable()
export class ModalService {
    constructor() {}

    loadModal(component: ComponentRef<any>, vcr: ViewContainerRef): MatDialogRef<DialogContentComponent, any> {
        // console.log(component.instance);
        const emptyPanelClass = component.instance.panelClass;
        const modalComponentRef = vcr.createComponent<ModalComponent>(ModalComponent);
        return modalComponentRef.instance.openDefaultModal(component, emptyPanelClass);
    }

    loadModalWithObject(component: ComponentRef<any>, object: any, vcr: ViewContainerRef) {
        // console.log(component.instance);
        const emptyPanelClass = component.instance.panelClass;
        component.instance.object = object;
        const modalComponentRef = vcr.createComponent<ModalComponent>(ModalComponent);
        modalComponentRef.instance.openDefaultModal(component, emptyPanelClass);
    }

    loadModalWithPanelClass(component: ComponentRef<any>, panelClass: string, vcr: ViewContainerRef) {
        // console.log(component.instance);
        const modalComponentRef = vcr.createComponent<ModalComponent>(ModalComponent);
        modalComponentRef.instance.openDefaultModal(component, panelClass);
    }
}
