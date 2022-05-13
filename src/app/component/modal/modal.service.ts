import { Injectable, Input, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { ModalComponent } from './modalComponents/modal.component';

@Injectable()
export class ModalService {
    private rootViewContainer!: ViewContainerRef;

    setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.rootViewContainer = viewContainerRef;
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
