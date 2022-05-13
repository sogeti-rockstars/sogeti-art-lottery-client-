import { Component, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ModalObject } from '../../modal/modal-object';

@Component({
    selector: 'app-fancy-image-card',
    templateUrl: './fancy-image-card.component.html',
    styleUrls: ['./fancy-image-card.component.css'],
})
export class FancyImageCardComponent implements OnInit, ModalObject {
    public label!: string;
    public artItem!: ArtItem;
    public panelClass!: string;

    // Dessa två behövs för att componenten ska kunna ta emot any-objektet och göra om det till ett artItem...
    // Man kan välja att bara ha kvar det som ett any-objekt men det känns svårare att jobba med tycker jag
    object: any;
    // Kan dock vara bra för components där det som visas är auto-genererat baserat på vad som finns i componenten
    ngOnInit(): void {
        this.artItem = this.object;
    }

    constructor(private itemApiService: ArtItemApiService) {
        this.panelClass = 'custom-dialog-container';
    }
    loadImageUrl(): string {
        return this.itemApiService.getArtItemImageUrl(this.artItem.id);
    }
}
