import { ComponentFactoryResolver, Injectable, ViewContainerRef } from "@angular/core";
import { ModalInfoComponent } from "./modal-info/modal-info.component";

@Injectable()
export class ModalService {
    private rootViewContainer!: ViewContainerRef;

    constructor(private factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    
    setRootViewContainerRef(viewContainerRef: any) {
        this.rootViewContainer = viewContainerRef;
    }

    addInfoHeaderComponent(modalHeader: string, modalBody: string) {
        const factory = this.factoryResolver.resolveComponentFactory(ModalInfoComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        component.instance.modalHeader = modalHeader;
        component.instance.modalBody = modalBody;
        // Subscribe to the closeModal event and destroy the component
        component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));

        this.rootViewContainer.insert(component.hostView);
    }

    removeDynamicComponent(component: any) {
        component.destroy();
    }
}
