import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Subject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ArtItem } from '../model/art-item';
import { ArtItemApiService } from './api/art-item-api.service';

@Injectable({
  providedIn: 'root',
})
export class ArtItemService {
  // <<<<<<< material_bootstrap_mush
  // private apiServerUrl = environment.apiBaseUrl;
  // postId!: number;
  // status!: string;
  // constructor(private http: HttpClient, private auth: AuthService) {}
  //
  // public getArtItems(): Observable<ArtItem[]> {
  //   return this.http.get<ArtItem[]>(`${this.apiServerUrl}/api/v1/item/`, {
  //     headers: this.auth.authHeaders,
  //   });
  // }
  //
  // public addArtItem(artItem: ArtItem): Observable<ArtItem> {
  //   console.log(artItem.itemName + 'addItemService');
  //   return this.http.post<ArtItem>(
  //     `${this.apiServerUrl}/api/v1/item/`,
  //     artItem,
  //     { headers: this.auth.authHeaders }
  //   );
  // }
  //
  // public updateArtItem(artItem: ArtItem): Observable<ArtItem> {
  //   console.log(`Update: { id:${artItem.id}, itemName:${artItem.itemName} } `);
  //   return this.http.put<ArtItem>(
  //     `${this.apiServerUrl}/api/v1/item/${artItem.id}`,
  //     artItem,
  //     { headers: this.auth.authHeaders }
  //   );
  // }
  //
  // public deleteArtItem(id: number): Observable<Object> {
  //   console.log(`Delete: { id:${id} } `);
  //   return this.http.delete<Object>(`${this.apiServerUrl}/api/v1/item/${id}`, {
  //     headers: this.auth.authHeaders,
  //   });
  // }
  //
  // //WIP
  // public getArtItemImage(id: number): Observable<Blob> {
  //   var imageUrl = `${this.apiServerUrl}/api/v1/item/image/${id}`;
  //   console.log(`getPictureUrl: { id:${id} } url: ${imageUrl}`);
  //   return this.http.get<Blob>(imageUrl, {
  //     headers: this.auth.authHeaders,
  //   });
  // }
  //
  // public getArtItemImageUrl(id: number): string {
  //   var imageUrl = `${this.apiServerUrl}/api/v1/item/image/${id}`;
  //   console.log(`getPictureUrl: { id:${id} } url: ${imageUrl}`);
  //   return imageUrl;
  // }
  //   =======
    postId!: number;
  status!: string;

  private artItemSubject: Subject<ArtItem> = new Subject();
  public artItemSubject$ = this.artItemSubject.asObservable();
  paintings: ArtItem[]=[];

  constructor(private artItemApiService: ArtItemApiService) {}

  public observeUpdateArtItem(artItem:ArtItem): Observable<ArtItem>{
    return this.artItemApiService.updateArtItem(artItem).pipe(
      retry(1),
      tap(response => this.artItemSubject.next(artItem))
    );
  } 
  public observeAddArtItem(artItem:ArtItem): Observable<ArtItem>{
    return this.artItemApiService.addArtItem(artItem).pipe(
      retry(1),
      tap(response => this.artItemSubject.next(artItem))
    );
  }

}
