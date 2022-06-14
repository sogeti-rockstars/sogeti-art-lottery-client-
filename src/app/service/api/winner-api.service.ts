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
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getWinners(): Observable<Winner[]> {
        return this.http.get<Winner[]>(`${this.apiServerUrl}/api/v1/winner/`, this.auth.getHttpOptions());
    }

    public getWinner(id: number): Observable<Winner> {
        return this.http.get<Winner>(`${this.apiServerUrl}/api/v1/winner/${id}`, this.auth.getHttpOptions());
    }

    public addWinner(winner: Winner): Observable<Winner> {
        return this.http.post<Winner>(`${this.apiServerUrl}/api/v1/winner/`, winner, this.auth.getHttpOptions());
    }

    public updateWinner(winner: Winner): Observable<Winner> {
        return this.http.put<Winner>(`${this.apiServerUrl}/api/v1/winner/${winner.id}`, winner, this.auth.getHttpOptions());
    }

    public deleteWinner(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiServerUrl}/api/v1/winner/${id}`, this.auth.getHttpOptions());
    }
}
