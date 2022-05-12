import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArtItem } from './model/art-item';
import { ArtItemApiService } from './service/api/art-item-api.service';
import { ArtItemService } from './service/art-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sogeti-art-lottery-client';
  paintings: ArtItem[] = [];

  constructor(private artItemApiService: ArtItemApiService, private artItemService: ArtItemService) {}

  ngOnInit(): void {
    this.loadPaintings();
    this.artItemService.artItemSubject$.subscribe(() => {
      this.loadPaintings();
    });
  }

  // Example code on how to use painting service:
  public loadPaintings(): void {
    this.artItemApiService.getArtItems().subscribe({
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

  public getImageUrl(id: number): string {
    return this.artItemApiService.getArtItemImageUrl(id);
  }

  public deleteArtItem(e: any, artItem: ArtItem) {
    e.preventDefault();
    this.artItemApiService.deleteArtItem(artItem.id).subscribe({
      complete: () => {
        this.loadPaintings();
      },
    });
  }
}
