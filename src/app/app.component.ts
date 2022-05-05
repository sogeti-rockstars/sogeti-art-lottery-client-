import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from './component/modal/modal.service';
import { ArtItem } from './model/art-item';
import { ArtItemService } from './service/art-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'sogeti-art-lottery-client';
  paintings: ArtItem[]=[];
  isImageLoading: boolean=false;

  constructor(private artItemService: ArtItemService, private viewContainerRef: ViewContainerRef, 
    private modalService: ModalService) {}
  ngOnInit(): void {
    this.loadPaintings();
  }

  // Example code on how to use painting service:
  public loadPaintings(): void {
    this.artItemService.getArtItems().subscribe({
      complete: () => {
        console.log('Loading complete!');
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      next: (resp: ArtItem[]) => {
        this.paintings = resp;
      },
    });
  }

  imageToShow: any;

  public getImageUrl(id:number): string{
    return this.artItemService.getArtItemImageUrl(id);
  }


  //WIP: loading an image from blob
// createImageFromBlob(image: Blob) {
//    let reader = new FileReader();
//    reader.addEventListener("load", () => {
//       this.imageToShow = reader.result;
//    }, false);

//    if (image) {
//       reader.readAsDataURL(image);
//    }
// }

//   getImageFromService(artItem:ArtItem) {
//     this.isImageLoading = true;
//     this.artItemService.getArtItemImage(artItem.id).subscribe(data => {
//       this.createImageFromBlob(data);
//       this.isImageLoading = false;
//     }, error => {
//       this.isImageLoading = false;
//       console.log(error);
//     });
// }

  public addArtItem(e: any){
    e.preventDefault();
    const artItem = new ArtItem;
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.itemModal(artItem, `Add new item`);
  }

  public updateArtItem(e: any, artItem: ArtItem){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.itemModal(artItem, `Update "${artItem.itemName}"`);
  }

  public editImageModalView(e:any, artItem:ArtItem){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.editItemImageModal(artItem, 'Image modal');
  }

  public imageModalView(e:any, artItem:ArtItem){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.itemImageModal(artItem, 'Image modal');
  }

  public deleteArtItem(e: any, artItem: ArtItem){
    e.preventDefault();
    this.artItemService.deleteArtItem(artItem.id).subscribe({
      complete: () => {
        this.loadPaintings();
      }
    })
  }
}
