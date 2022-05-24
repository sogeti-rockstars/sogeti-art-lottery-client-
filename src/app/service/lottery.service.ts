import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtItem } from '../model/art-item';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { LotteryApiService } from './api/lottery-api.service';

@Injectable({
    providedIn: 'root',
})
export class LotteryService {
    constructor(private service: LotteryApiService) {}

    public getLotteries(): Observable<Lottery[]> {
        return this.service.getLotteries();
    }

    public getLotteriesSummary(): Observable<Lottery[]> {
        return this.service.getLotteriesSummary();
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.service.getLottery(id);
    }

    public getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.service.getArtItemsByLotteryId(id);
    }

    public getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.getWinnersByLotteryId(id);
    }

    public getContestantsByLotteryId(id: number): Observable<Contestant[]> {
        return this.service.getContestantsByLotteryId(id);
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        return this.addLottery(lottery);
    }

    public addContestantToLottery(lotteryId: number, contestant: Contestant): Observable<Lottery> {
        return this.addContestantToLottery(lotteryId, contestant);
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        return this.updateLottery(lottery);
    }

    public deleteLottery(id: number): Observable<Object> {
        return this.deleteLottery(id);
    }

    public spinTheWheel(id: number): Observable<Winner> {
        return this.spinTheWheel(id);
    }

    public spinTheWheelWithItem(id: number): Observable<Winner> {
        return this.spinTheWheelWithItem(id);
    }
}
