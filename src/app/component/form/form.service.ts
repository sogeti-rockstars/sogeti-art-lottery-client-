import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private rootViewContainer!: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
  }
  
  setRootViewContainerRef(viewContainerRef: any) {
      this.rootViewContainer = viewContainerRef;
  }
}
