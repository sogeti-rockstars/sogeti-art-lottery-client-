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
    private apiBase: string = `${environment.apiBaseUrl}/api/v1/lottery/`;

    constructor(private http: HttpClient, private auth: AuthService) {}

    public getLotteries(): Observable<Lottery[]> {
        return this.httpGet<Lottery[]>();
    }

    public getLotteriesSummary(): Observable<Lottery[]> {
        return this.httpGet<Lottery[]>('summary');
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.httpGet<Lottery>(id);
    }

    public getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.httpGet<ArtItem[]>(`${id}/items`);
    }

    public getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.httpGet<Winner[]>(`${id}/winners`);
    }

    public getContestantsByLotteryId(id: number): Observable<Contestant[]> {
        return this.httpGet<Contestant[]>(`${id}/contestants`);
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        return this.httpPost<Lottery>(lottery);
    }

    public addContestantToLottery(lotteryId: number, contestant: Contestant): Observable<Lottery> {
        return this.httpPut<Lottery>(contestant, `addContestant/${lotteryId}`);
    }

    public addItemToLottery(lotteryId: number, artItem: ArtItem): Observable<Lottery> {
        return this.httpPut<Lottery>(artItem, `addItem/${lotteryId}`);
    }

    public editItemToLottery(lotteryId: number, artItem: ArtItem): Observable<Lottery> {
        return this.httpPut<Lottery>(artItem, `editItem/${lotteryId}`);
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        return this.httpPut<Lottery>(lottery, lottery.id);
    }

    public deleteLottery(id: number): Observable<Object> {
        return this.httpDel<Object>(id);
    }

    public spinTheWheel(id: number): Observable<Winner> {
        console.log(`${id}/spin`);
        return this.httpPut<Winner>(null, `${id}/spin`);
    }

    private httpGet<T>(restPath?: string | number): Observable<T> {
        return this.http.get<T>(`${this.apiBase}${restPath === undefined ? '' : restPath}`, this.getHeaders());
    }

    private httpPut<T>(data: any, restPath?: string | number): Observable<T> {
        return this.http.put<T>(`${this.apiBase}${restPath === undefined ? '' : restPath}`, data, this.getHeaders());
    }

    private httpPost<T>(data: T, restPath?: string | number): Observable<T> {
        return this.http.post<T>(`${this.apiBase}${restPath === undefined ? '' : restPath}`, data, this.getHeaders());
    }

    private httpDel<T>(restPath?: string | number): Observable<T> {
        return this.http.delete<T>(`${this.apiBase}${restPath === undefined ? '' : restPath}`, this.getHeaders());
    }

    private getHeaders() {
        return { headers: this.auth.authHeaders };
    }
}
