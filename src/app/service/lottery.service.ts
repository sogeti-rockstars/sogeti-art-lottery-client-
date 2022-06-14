import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { ArtItem } from '../model/art-item';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { LotteryApiService } from './api/lottery-api.service';

@Injectable({
    providedIn: 'root',
})
export class LotteryService {
    @Output() lotteryChanged = new EventEmitter<Lottery>();

    private currLottery?: Lottery;
    private lotteries?: Lottery[];

    constructor(private apiService: LotteryApiService) {
        this.getLotteriesSummary().subscribe((_) => this.setCurrentLotteryIndex(0));
    }

    /**
     * Set the current lottery.
     * @param idx the INDEX of the lottery as given by the list returned by getLotteries() and getLotteriesSummary()
     */
    public async setCurrentLotteryIndex(idx: number) {
        if (this.lotteries === undefined) await firstValueFrom(this.getLotteriesSummary());
        this.getLottery(this.lotteries![idx].id).subscribe((lottery) => {
            this.currLottery = lottery;
            this.lotteryChanged.emit(this.currLottery);
        });
    }

    public async setCurrentLottery(id: number) {
        if (this.lotteries === undefined) await firstValueFrom(this.getLotteriesSummary());
        this.getLottery(id).subscribe((lottery) => {
            this.currLottery = lottery;
            this.lotteryChanged.emit(this.currLottery);
        });
    }

    public editItemToLottery(lotteryId: number, artItem: ArtItem): Observable<Lottery> {
        return this.apiService.editItemToLottery(lotteryId, artItem).pipe(
            tap((response) => {
                this.currLottery = response;
                this.lotteryChanged.emit(this.currLottery);
            })
        );
    }

    public get currLotteryId(): number | undefined {
        return this.currLottery?.id;
    }

    public getLotteriesSummary(): Observable<Lottery[]> {
        return this.apiService.getLotteriesSummary().pipe(tap((response) => (this.lotteries = response)));
    }

    public getLottery(id: number): Observable<Lottery> {
        return this.apiService.getLottery(id);
    }

    public detectChanges() {
        this.apiService.getLottery(this.currLotteryId!).subscribe((r) => this.lotteryChanged.emit(r));
    }

    public getArtItemsByLotteryId(id: number): Observable<ArtItem[]> {
        return this.apiService.getArtItemsByLotteryId(id);
    }

    public getCurrentWinners(): Observable<Winner[]> | undefined {
        if (this.currLottery === undefined) return undefined;
        return this.getWinnersByLotteryId(this.currLottery.id);
    }

    public getWinnersByLotteryId(id: number): Observable<Winner[]> {
        return this.apiService.getWinnersByLotteryId(id);
    }

    public addLottery(lottery: Lottery): Observable<Lottery> {
        return this.apiService.addLottery(lottery);
    }

    public updateLottery(lottery: Lottery): Observable<Lottery> {
        return this.apiService.updateLottery(lottery);
    }

    public deleteLottery(id: number): Observable<Object> {
        this.lotteries = undefined;
        this.currLottery = undefined;
        return this.apiService.deleteLottery(id).pipe(
            tap((_) => {
                this.setCurrentLotteryIndex(0);
            })
        );
    }

    public spinTheWheel(id: number): Observable<Winner> {
        return this.apiService.spinTheWheel(id);
    }
}
