import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtItem } from 'src/app/model/art-item';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { Winner } from 'src/app/model/winner';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class LotteryApiService {
    private apiServerUrl = environment.apiBaseUrl;
    postId!: number;
    status!: string;
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getLotteries(): Observable<Lottery[]> {
        return this.http.get<Lottery[]>(`${this.apiServerUrl}/api/v1/lottery/`, {
            headers: this.auth.authHeaders,
        });
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.http.get<Lottery>(`${this.apiServerUrl}/api/v1/lottery/${id}`, {
            headers: this.auth.authHeaders,
        });
    }

    getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.http.get<ArtItem[]>(`${this.apiServerUrl}/api/v1/lottery/${id}/items`, {
            headers: this.auth.authHeaders,
        });
    }

    getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.http.get<Winner[]>(`${this.apiServerUrl}/api/v1/lottery/${id}/winners`, {
            headers: this.auth.authHeaders,
        });
    }

    getContestantsByLotteryId(id: number): Observable<Contestant[]> {
        return this.http.get<Contestant[]>(`${this.apiServerUrl}/api/v1/lottery/${id}/contestants`, {
            headers: this.auth.authHeaders,
        });
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        console.log(lottery.title + 'addLotteryService');
        return this.http.post<Lottery>(`${this.apiServerUrl}/api/v1/lottery/`, lottery, { headers: this.auth.authHeaders });
    }

    public addContestantToLottery(lotteryId: number, contestant: Contestant): Observable<Lottery> {
        // console.log(`Update: { id:${lottery.id}, title:${lottery.title} } `);
        return this.http.put<Lottery>(`${this.apiServerUrl}/api/v1/lottery/addContestant/${lotteryId}`, contestant, { headers: this.auth.authHeaders });
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        // console.log(`Update: { id:${lottery.id}, title:${lottery.title} } `);
        return this.http.put<Lottery>(`${this.apiServerUrl}/api/v1/lottery/${lottery.id}`, lottery, { headers: this.auth.authHeaders });
    }

    public deleteLottery(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiServerUrl}/api/v1/lottery/${id}`, {
            headers: this.auth.authHeaders,
        });
    }

    public spinTheWheel(id: number): Observable<Winner> {
        return this.http.get<Winner>(`${this.apiServerUrl}/api/v1/lottery/spin/${id}`, {
            headers: this.auth.authHeaders,
        });
    }

    public spinTheWheelWithItem(id: number): Observable<Winner> {
        return this.http.get<Winner>(`${this.apiServerUrl}/api/v1/lottery/spin-with-item/${id}`, {
            headers: this.auth.authHeaders,
        });
    }
}
