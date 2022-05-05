import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ArtItem } from "src/app/model/art-item";
import { ArtItemService } from "src/app/service/art-item.service";

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
  imageView!:boolean;
  editView!:boolean;
  private rootViewContainer!: ViewContainerRef;
  constructor(private factoryResolver: ComponentFactoryResolver, private itemService: ArtItemService) {
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

  loadImageUrl(): string{
    return this.itemService.getArtItemImageUrl(this.artItem.id);
  }

}
