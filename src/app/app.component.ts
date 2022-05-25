import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtItem } from './model/art-item';
import { ArtItemApiService } from './service/api/art-item-api.service';
import { ArtItemService } from './service/art-item.service';
import { LotteryService } from './service/lottery.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'sogeti-art-lottery-client';
    isImageLoading: boolean = false;
    // isAdmin: boolean = location.search.indexOf('adminview') != -1;

    constructor(private artItemApiService: ArtItemApiService) {}
    ngOnInit(): void {}

    imageToShow: any;

    public getImageUrl(id: number): string {
        return this.artItemApiService.getArtItemImageUrl(id);
    }
}
