import { Component, OnInit, ViewContainerRef } from '@angular/core';
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

    // Dessa två behövs för att componenten ska kunna ta emot any-objektet och göra om det till ett artItem...
    // Man kan välja att bara ha kvar det som ett any-objekt men det känns svårare att jobba med tycker jag
    object: any;
    // Kan dock vara bra för components där det som visas är auto-genererat baserat på vad som finns i componenten
    ngOnInit(): void {
        this.artItem = this.object;
    }

    constructor(private itemApiService: ArtItemApiService, private vcr: ViewContainerRef) {
        this.panelClass = 'custom-dialog-container';
    }
}
