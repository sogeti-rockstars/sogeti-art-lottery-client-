// import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
// import { ModalInfoComponent } from './modal-info/modal-info.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModalService {
//   private rootViewContainer!: ViewContainerRef;

//   constructor() {
//   }
//   setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
//     this.rootViewContainer = viewContainerRef;
// }
//   addInfoHeaderComponent(modalHeader: string, modalBody: string){
//     const component = this.rootViewContainer.createComponent(ModalInfoComponent);
//     component.instance.modalHeader = modalHeader;
//     component.instance.modalBody = modalBody;
//     component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));

//     this.rootViewContainer.insert(component.hostView);
//   }

//   removeDynamicComponent(component: ComponentRef<ModalInfoComponent>){
//     component.destroy();
//   }
// }
