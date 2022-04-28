import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Painting } from './model/painting';
import { PaintingService } from './service/painting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sogeti-art-lottery-client';

  constructor(private paintingService: PaintingService) {}

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
}
