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
    private apiBase: string = `${environment.apiBaseUrl}/api/v1`;
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getLotteries(): Observable<Lottery[]> {
        return this.httpGet<Lottery[]>(`/lottery/`);
    }

    public getLotteriesSummary(): Observable<Lottery[]> {
        return this.httpGet<Lottery[]>(`/lottery/summary`);
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.httpGet<Lottery>(`/lottery/${id}`);
    }

    public getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.httpGet<ArtItem[]>(`/lottery/${id}/items`);
    }

    public getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.httpGet<Winner[]>(`/lottery/${id}/winners`);
    }

    public getContestantsByLotteryId(id: number): Observable<Contestant[]> {
        return this.httpGet<Contestant[]>(`/lottery/${id}/contestants`);
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        return this.httpPost<Lottery>('/lottery/', lottery);
    }

    public addContestantToLottery(lotteryId: number, contestant: Contestant): Observable<Lottery> {
        return this.httpPut<Lottery>(`/lottery/addContestant/${lotteryId}`, contestant);
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        return this.httpPut<Lottery>(`/lottery/${lottery.id}`, lottery);
    }

    public deleteLottery(id: number): Observable<Object> {
        return this.httpGet<Object>(`/lottery/${id}`);
    }

    public spinTheWheel(id: number): Observable<Winner> {
        return this.httpGet<Winner>(`/lottery/spin/${id}`);
    }

    public spinTheWheelWithItem(id: number): Observable<Winner> {
        return this.httpGet<Winner>(`/lottery/spin-with-item/${id}`);
    }

    private httpGet<T>(restPath: string): Observable<T> {
        return this.http.get<T>(`${this.apiBase}${restPath}`, this.getHeaders());
    }

    private httpPut<T>(restPath: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.apiBase}${restPath}}`, data, this.getHeaders());
    }

    private httpPost<T>(restPath: string, data: T): Observable<T> {
        return this.http.post<T>(`${this.apiBase}${restPath}`, data, this.getHeaders());
    }

    private getHeaders() {
        return { headers: this.auth.authHeaders };
    }
}
