import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  @Input() modalHeader!: string;
  @Input() modalBody!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() artItem!: ArtItem;
  private rootViewContainer!: ViewContainerRef;
  imageUrl!: string;

  constructor(private itemService: ArtItemService, private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
}

  ngOnInit(): void {

  }
  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
}

loadImageUrl(): string{
  this.imageUrl = this.itemService.getArtItemImageUrl(this.artItem.id);
  return this.imageUrl;
}

  close(event: any){
    this.closeModal.emit(event);
  }

}
