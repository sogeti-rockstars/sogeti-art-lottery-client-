import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';
import { MaterialmodalComponent } from '../modal/materialmodal/materialmodal.component';
import { ModalDirective } from '../modal/modal.directive';

@Component({
  selector: 'art-items-list',
  templateUrl: './art-items-list.component.html',
  styleUrls: ['./art-items-list.component.css'],
})
export class ArtItemsListComponent implements AfterContentChecked {
  public artItems: ArtItem[] = [];
  // @ViewChild(ModalDirective, {static: true}) modalHost!: ModalDirective

  // loadModal(artItem:ArtItem){
  //   const viewContainerRef = this.modalHost.viewContainerRef;
  //   viewContainerRef.clear();
  //   const componentRef = viewContainerRef.createComponent<MaterialmodalComponent>(MaterialmodalComponent);
  //   componentRef.instance.artItem = artItem; 
  //   componentRef.instance.viewItem = true;
  //   componentRef.instance.openDialogImage(artItem);
   
  // }
  constructor(private app: AppComponent) {}

  ngOnInit(): void {
    // this.artItems = this.app.paintings;
    this.artItems = this.app.paintings;
  }

  ngAfterContentChecked(): void {
    this.artItems = this.app.paintings;
  }

}
