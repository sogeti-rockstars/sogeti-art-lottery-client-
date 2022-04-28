import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from './component/modal/modal.service';
import { Painting } from './model/painting';
import { PaintingService } from './service/painting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sogeti-art-lottery-client';

  constructor(private paintingService: PaintingService, private modalService: ModalService, private viewContainerRef: ViewContainerRef) {}

  // Example code on how to use painting service:
  public loadPaintings(): void {
    this.paintingService.getPaintings().subscribe({
      complete: () => {
        console.log('Loading complete!');
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      next: (resp: Painting[]) => {
        this.paintings = resp;
      },
    });
  }

  public paintings: Painting[] = [];

  public modalInfo(e: any, modalHeader: string, modalBody: string){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addInfoHeaderComponent(modalHeader, modalBody);
  }
}