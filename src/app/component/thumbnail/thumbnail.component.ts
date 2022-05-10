import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { MaterialmodalComponent } from '../modal/materialmodal/materialmodal.component';
import { ModalDirective } from '../modal/modal.directive';

@Component({
  selector: 'thumbnail',
  styleUrls: ['./thumbnail.component.css'],
  templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent implements OnInit {
  @Input() id: number;
  @Input() cssClass: string;
  @Input() artItem!: ArtItem;
  @ViewChild(ModalDirective, {static: true}) modalHost!: ModalDirective

  loadModal(){
    const componentRef = this.viewContainerRef.createComponent<MaterialmodalComponent>(MaterialmodalComponent);
    componentRef.instance.artItem = this.artItem; 
    componentRef.instance.viewItem = true;
    componentRef.instance.openFancyItemCard(this.artItem);
   
  }

  constructor(private viewContainerRef:ViewContainerRef) {
    this.id = 0;
    this.cssClass = 'thumbnailImg';
  }

  ngOnInit(): void {
    console.log(this);
  }
}

