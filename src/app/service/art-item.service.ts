import { Injectable } from '@angular/core';
import { retry, Subject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ArtItem } from '../model/art-item';
import { ArtItemApiService } from './api/art-item-api.service';
import { LotteryService } from './lottery.service';

@Injectable({
    providedIn: 'root',
})
export class ArtItemService {
    private artItemSubject: Subject<ArtItem> = new Subject();
    public artItemSubject$ = this.artItemSubject.asObservable();

    private imageSubject: Subject<FormData> = new Subject();
    public imageSubject$ = this.imageSubject.asObservable();
    paintings: ArtItem[] = [];

    constructor(private artItemApiService: ArtItemApiService, private lotteryService: LotteryService) {}

    public observeUpdateArtItem(artItem: ArtItem): Observable<ArtItem> {
        return this.artItemApiService.updateArtItem(artItem).pipe(
            retry(1),
            tap((_) => this.artItemSubject.next(artItem))
        );
    }

    public getArtItems(): Observable<ArtItem[]> {
        return this.artItemApiService.getArtItems();
    }

    public add(item: ArtItem): Observable<ArtItem> {
        return this.artItemApiService.addArtItem(item).pipe(tap((_) => this.lotteryService.detectChanges()));
    }

    public deleteArtItem(id: number): Observable<Object> {
        return this.artItemApiService.deleteArtItem(id).pipe(
            retry(1),
            tap((_) => this.artItemSubject.next(new ArtItem()))
        );
    }

    public setImage(artItem: ArtItem, upload: FormData): Observable<FormData> {
        return this.artItemApiService.updateImage(artItem.id, upload).pipe(
            retry(1),
            tap((response) => this.imageSubject.next(response))
        );
    }
}
