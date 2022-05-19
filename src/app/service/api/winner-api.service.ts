import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Winner } from 'src/app/model/winner';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class WinnerApiService {
    private apiServerUrl = environment.apiBaseUrl;
    postId!: number;
    status!: string;
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getWinners(): Observable<Winner[]> {
        return this.http.get<Winner[]>(`${this.apiServerUrl}/api/v1/winner/`, {
            headers: this.auth.authHeaders,
        });
    }

    public getWinner(id: number): Observable<Winner> {
        return this.http.get<Winner>(`${this.apiServerUrl}/api/v1/winner/${id}`, {
            headers: this.auth.authHeaders,
        });
    }

    public addWinner(winner: Winner): Observable<Winner> {
        console.log(winner + 'addWinnerService');
        return this.http.post<Winner>(`${this.apiServerUrl}/api/v1/winner/`, winner, { headers: this.auth.authHeaders });
    }

    public updateWinner(winner: Winner): Observable<Winner> {
        // console.log(`Update: { id:${winner.id}, title:${winner.title} } `);
        return this.http.put<Winner>(`${this.apiServerUrl}/api/v1/winner/${winner.id}`, winner, { headers: this.auth.authHeaders });
    }

    public deleteWinner(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiServerUrl}/api/v1/winner/${id}`, {
            headers: this.auth.authHeaders,
        });
    }
}
