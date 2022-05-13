import { ComponentFactory, ComponentRef, Injectable, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { ModalComponent } from './modalComponents/modal.component';

@Injectable()
export class ModalService {
    constructor() {}

    loadModal(component: ComponentRef<any>, vcr: ViewContainerRef) {
        // console.log(component.instance);
        const emptyPanelClass = component.instance.panelClass;
        const modalComponentRef = vcr.createComponent<ModalComponent>(ModalComponent);
        modalComponentRef.instance.openDefaultModal(component, emptyPanelClass);
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
