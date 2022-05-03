import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ArtItem } from '../model/art-item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArtItemService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getArtItems(): Observable<ArtItem[]> {
    return this.http.get<ArtItem[]>(`${this.apiServerUrl}/api/v1/item/`, {
      headers: this.auth.authHeaders,
    });
  }
  public addArtItem(artItem:ArtItem): Observable<ArtItem>{
    console.log(artItem.itemName+'addItemService')
    return this.http.post<ArtItem>(`${this.apiServerUrl}/api/v1/item`, artItem, {
      headers: this.auth.authHeaders,
    });
  }
  public updateArtItem(artItem:ArtItem) : Observable<ArtItem>{
    return this.http.put<ArtItem>(`${this.apiServerUrl}/api/v1/item/`, {
      headers: this.auth.authHeaders,
    });
  }
}
