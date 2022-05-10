import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Contestant } from '../model/contestant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContestantService {
  private apiServerUrl = environment.apiBaseUrl;
  postId!: number;
  status!: string;
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getContestants(): Observable<Contestant[]> {
    return this.http.get<Contestant[]>(
      `${this.apiServerUrl}/api/v1/contestant/`,
      {
        headers: this.auth.authHeaders,
      }
    );
  }

  public getContestant(id: number): Observable<Contestant> {
    return this.http.get<Contestant>(
      `${this.apiServerUrl}/api/v1/contestant/${id}`,
      {
        headers: this.auth.authHeaders,
      }
    );
  }

  public addContestant(artItem: Contestant): Observable<Contestant> {
    // console.log(artItem.itemName + 'addItemService');
    return this.http.post<Contestant>(
      `${this.apiServerUrl}/api/v1/contestant/`,
      artItem,
      { headers: this.auth.authHeaders }
    );
  }

  public updateContestant(artItem: Contestant): Observable<Contestant> {
    // console.log(`Update: { id:${artItem.id}, itemName:${artItem.itemName} } `);
    return this.http.put<Contestant>(
      `${this.apiServerUrl}/api/v1/contestant/${artItem.id}`,
      artItem,
      { headers: this.auth.authHeaders }
    );
  }

  public deleteContestant(id: number): Observable<Object> {
    return this.http.delete<Object>(
      `${this.apiServerUrl}/api/v1/contestant/${id}`,
      {
        headers: this.auth.authHeaders,
      }
    );
  }
}
