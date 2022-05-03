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

  public addItem(e: any){
    e.preventDefault();
    const artItem = new ArtItem;
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.itemModal(artItem, `Add new item`);
  }

  public updateItem(e: any, artItem: ArtItem){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.itemModal(artItem, `Update "${artItem.itemName}"`);
  }
}
