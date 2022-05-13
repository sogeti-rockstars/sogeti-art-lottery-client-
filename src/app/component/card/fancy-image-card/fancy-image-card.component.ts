import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';

@Component({
  selector: 'app-fancy-image-card',
  templateUrl: './fancy-image-card.component.html',
  styleUrls: ['./fancy-image-card.component.css']
})
export class FancyImageCardComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    label: string;
    artItem: ArtItem;
  }, private itemApiService: ArtItemApiService){}

loadImageUrl(): string{
  return this.itemApiService.getArtItemImageUrl(this.data.artItem.id);
}
  

}
