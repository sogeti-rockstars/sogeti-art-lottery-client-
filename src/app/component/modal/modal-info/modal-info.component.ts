import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from "@angular/core";
import { ArtItem } from "src/app/model/art-item";
import { ArtItemFormComponent } from "../../form/art-item-form/art-item-form.component";

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
  @Input() modalHeader!: string;
  @Input() modalBody!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() artItem!: ArtItem;
  private rootViewContainer!: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
}

  ngOnInit(): void {

  }
  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
}

  close(event: any){
    this.closeModal.emit(event);
  }

}
