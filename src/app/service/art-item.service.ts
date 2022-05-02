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
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getArtItems(): Observable<ArtItem[]> {
    return this.http.get<ArtItem[]>(this.reqBuild('get-all'), {
      headers: this.auth.authHeaders,
    });
  }

  private apiServerUrl = environment.apiBaseUrl;

  private reqs: Map<string, string> = new Map()
    .set('get-all', `${this.apiServerUrl}/api/v1/item/get-all`)
    .set('get', `${this.apiServerUrl}/api/v1/item/get`);

  private reqBuild(key: string): string {
    let request: string = this.reqs.get(key) || '';
    console.log(`Requesting: ${request}.`);
    return request;
  }
}
