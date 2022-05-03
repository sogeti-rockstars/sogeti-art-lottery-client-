import { ComponentFactoryResolver, Injectable, ViewContainerRef } from "@angular/core";
import { ArtItem } from "src/app/model/art-item";
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

    removeDynamicComponent(component: any) {
        component.destroy();
    }

    itemModal(artItem: ArtItem, header:string){
        const factory = this.factoryResolver.resolveComponentFactory(ModalInfoComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        console.log(artItem.itemName+'modalservice')
        component.instance.modalHeader = header;
        component.instance.artItem = artItem;
        component.instance.setRootViewContainerRef(this.rootViewContainer)
        // Subscribe to the closeModal event and destroy the component
        component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));
        
        this.rootViewContainer.insert(component.hostView);
        console.log('hej')
    }
}
