import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Painting } from '../model/painting';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getPaintings(): Observable<Painting[]> {
    return this.http.get<Painting[]>(this.reqBuild('getAll'), {
      headers: this.auth.authHeaders,
    });
  }

  private apiServerUrl = environment.apiBaseUrl;

  private reqs: Map<string, string> = new Map()
    .set('getAll', `${this.apiServerUrl}/api/v1/painting/getAll`)
    .set('get', `${this.apiServerUrl}/api/v1/painting/get`);

  private reqBuild(key: string): string {
    let request: string = this.reqs.get(key) || '';
    console.log(`Requesting: ${request}.`);
    return request;
  }
}
