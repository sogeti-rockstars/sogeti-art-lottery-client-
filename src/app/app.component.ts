import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ArtItem } from './model/art-item';
import { ArtItemService } from './service/art-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'sogeti-art-lottery-client';

  constructor(private artItemService: ArtItemService) {}

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

  public modalInfo(e: any, modalHeader: string, modalBody: string){
    e.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addInfoHeaderComponent(modalHeader, modalBody);
  }
}
  public paintings: ArtItem[] = [];
}
