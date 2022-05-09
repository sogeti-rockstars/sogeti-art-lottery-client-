import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArtItem } from './model/art-item';
import { ArtItemService } from './service/art-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sogeti-art-lottery-client';
  paintings: ArtItem[] = [];
  isImageLoading: boolean = false;

  constructor(private artItemService: ArtItemService) {}

  ngOnInit(): void {
    this.loadPaintings();
  }

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

  public getImageUrl(id: number): string {
    return this.artItemService.getArtItemImageUrl(id);
  }
}
