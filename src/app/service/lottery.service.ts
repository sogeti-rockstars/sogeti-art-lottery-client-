import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, Observable, retry, tap } from 'rxjs';
import { ArtItem } from '../model/art-item';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { LotteryApiService } from './api/lottery-api.service';

@Injectable({
    providedIn: 'root',
})
export class LotteryService {
    @Output() lotteryChanged = new EventEmitter<number>();

    private currLotteryId$?: number;
    private lotteries: Lottery[] = [];

    constructor(private apiService: LotteryApiService) {
        this.getLotteriesSummary().subscribe((_) => this.setCurrentLottery(0));
    }

    /**
     * Set the current lottery.
     * @param idx the INDEX of the lottery as given by the list returned by getLotteries() and getLotteriesSummary()
     */
    public setCurrentLottery(idx: number) {
        let newCurrent = this.lotteries[idx].id;
        if (newCurrent === undefined) return;

        this.currLotteryId$ = newCurrent;
        this.lotteryChanged.emit(this.currLotteryId$);
    }

    public get currLotteryId(): number | undefined {
        return this.currLotteryId$;
    }

    public getLotteries(): Observable<Lottery[]> {
        return this.apiService.getLotteries().pipe(tap((response) => (this.lotteries = response)));
    }

    public getLotteriesSummary(): Observable<Lottery[]> {
        return this.apiService.getLotteriesSummary().pipe(tap((response) => (this.lotteries = response)));
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.apiService.getLottery(id);
    }

    public getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.apiService.getArtItemsByLotteryId(id);
    }

    public getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.apiService.getWinnersByLotteryId(id);
    }

    public getContestantsByLotteryId(id: number): Observable<Contestant[]> {
        return this.apiService.getContestantsByLotteryId(id);
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        return this.apiService.addLottery(lottery);
    }

    public addContestantToLottery(lotteryId: number, contestant: Contestant): Observable<Lottery> {
        return this.apiService.addContestantToLottery(lotteryId, contestant);
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        return this.apiService.updateLottery(lottery);
    }

    public deleteLottery(id: number): Observable<Object> {
        return this.apiService.deleteLottery(id);
    }

    public spinTheWheel(id: number): Observable<Winner> {
        return this.apiService.spinTheWheel(id);
    }

    public spinTheWheelWithItem(id: number): Observable<Winner> {
        return this.apiService.spinTheWheelWithItem(id);
    }
}
