import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { MaterialmodalComponent } from '../modal/materialmodal/materialmodal.component';
import { ModalDirective } from '../modal/modal.directive';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent implements OnInit {
  @Input() id!: number;
  @Input() cssClass: string;
  @Input() artItem!: ArtItem;

  loadModal() {
    const componentRef =
      this.viewContainerRef.createComponent<MaterialmodalComponent>(
        MaterialmodalComponent
      );
    this.viewContainerRef.clear();
    componentRef.instance.artItem = this.artItem;
    componentRef.instance.viewItem = true;
    componentRef.instance.openFancyItemCard(this.artItem);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    public app: AppComponent
  ) {
    this.cssClass = 'thumbnailImg';
  }

    addModal() {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModal(component, this.viewContainerRef);
    }
}
