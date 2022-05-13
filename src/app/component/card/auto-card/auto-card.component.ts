import { Component, OnInit } from '@angular/core';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';

@Component({
    selector: 'app-auto-card',
    templateUrl: './auto-card.component.html',
    styleUrls: ['./auto-card.component.css'],
})
export class AutoCardComponent implements OnInit {
    object: any;
    objectContent: any[] = [];
    values: string[] = [];
    variableNames: string[] = [];
    panelClass: string;

    constructor(private itemApiService: ArtItemApiService) {
        this.panelClass = 'custom-dialog-container';
    }
    ngOnInit(): void {
        console.log(typeof this.object);
        this.objectContent = Object.entries(this.object);

        this.values = this.objectContent.map(function (value, index) {
            return value[1];
        });
        this.variableNames = this.objectContent.map(function (value, index) {
            return value[0];
        });
        for (let i = 0; i < this.variableNames.length; i++) {
            this.variableNames[i] = this.variableNames[i].replace(/([A-Z])/g, ' $1');
            this.variableNames[i] = this.variableNames[i].charAt(0).toUpperCase() + this.variableNames[i].slice(1);
        }
        console.log(this.values);
        console.log(this.variableNames);
    }

    loadImageUrl() {
        return this.itemApiService.getArtItemImageUrl(this.object.id);
    }
}
