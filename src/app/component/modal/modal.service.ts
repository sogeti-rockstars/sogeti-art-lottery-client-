// import { ComponentFactoryResolver, EventEmitter, Injectable, Output, ViewContainerRef } from "@angular/core";
// import { of } from "rxjs";
// import { Observable } from "rxjs/internal/Observable";
// import { ArtItem } from "src/app/model/art-item";
// import { ModalInfoComponent } from "./modal-info/modal-info.component";

// @Injectable()
// export class ModalService {
//     private rootViewContainer!: ViewContainerRef;
//     @Output() saveSuccessful: EventEmitter<ArtItem> = new EventEmitter<ArtItem>();
//     artItemOutput!:ArtItem;
    

//     constructor(private factoryResolver: ComponentFactoryResolver) {
//         this.factoryResolver = factoryResolver;
//     }
    
//     setRootViewContainerRef(viewContainerRef: any) {
//         this.rootViewContainer = viewContainerRef;
//     }

//     removeDynamicComponent(component: any) {
//         component.destroy();
//     }

//     itemModal(artItem: ArtItem, header:string): any{
//         const factory = this.factoryResolver.resolveComponentFactory(ModalInfoComponent);
//         const component = factory.create(this.rootViewContainer.parentInjector);
//         console.log(artItem.itemName+'modalservice')
//         component.instance.modalHeader = header;
//         component.instance.artItem = artItem;
//         component.instance.imageView = false;
//         component.instance.editView = true;
//         component.instance.newItem = true;
//         component.instance.setRootViewContainerRef(this.rootViewContainer)
//         // Subscribe to the closeModal event and destroy the component
//         component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));
//         component.instance.saveSuccessful.subscribe({next: (resp: ArtItem)=>{return resp;}})
        
//         this.rootViewContainer.insert(component.hostView);
//         console.log('hej')
//     }

//     editItemImageModal(artItem: ArtItem, header:string){
//         const factory = this.factoryResolver.resolveComponentFactory(ModalInfoComponent);
//         const component = factory.create(this.rootViewContainer.parentInjector);
//         console.log(artItem.itemName+'modalservice')
//         component.instance.modalHeader = header;
//         component.instance.artItem = artItem;
//         component.instance.editView = true;
//         component.instance.imageView = true;
//         component.instance.newItem = false;
//         component.instance.setRootViewContainerRef(this.rootViewContainer)
//         // Subscribe to the closeModal event and destroy the component
        
//         component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));
//         // component.instance.saveSuccessful.subscribe({next(resp: ArtItem){this.artItemOutput=resp}});
//         // const obsArtItem = of(this.artItemOutput);
//         // return obsArtItem;
//         this.rootViewContainer.insert(component.hostView);
//         console.log('hej')
//     }
//     itemImageModal(artItem: ArtItem, header:string): any{
//         const factory = this.factoryResolver.resolveComponentFactory(ModalInfoComponent);
//         const component = factory.create(this.rootViewContainer.parentInjector);
//         console.log(artItem.itemName+'modalservice')
//         component.instance.modalHeader = header;
//         component.instance.artItem = artItem;
//         component.instance.imageView = true;
//         component.instance.editView = false;
//         component.instance.newItem = true;
//         component.instance.setRootViewContainerRef(this.rootViewContainer)
//         // Subscribe to the closeModal event and destroy the component
//         //TODO: 
//         component.instance.saveSuccessful.subscribe({next: (resp: ArtItem)=>{return resp;}})
//         component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));
//         this.rootViewContainer.insert(component.hostView);
//         console.log('hej')
//     }

//     // saveSuccessfulEmit(artItem:ArtItem){
//     //     this.saveSuccessful.emit(artItem)
//     // }
// }
