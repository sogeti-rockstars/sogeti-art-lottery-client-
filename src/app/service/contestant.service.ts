import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contestant } from '../model/contestant';
import { ContestantApiService } from './api/contestant-api.service';
import { LotteryService } from './lottery.service';

@Injectable({
    providedIn: 'root',
})
export class ContestantService {
    constructor(private service: ContestantApiService, private lotteryService: LotteryService) {}

    public getContestants(lotteryId: number): Observable<Contestant[]> {
        return lotteryId < 0 ? this.service.getContestants() : this.lotteryService.getContestantsByLotteryId(lotteryId);
    }

    public getContestant(id: number): Observable<Contestant> {
        return this.service.getContestant(id);
    }

    public addContestant(cont: Contestant): Observable<Contestant> {
        return this.service.addContestant(cont);
    }

    public updateContestant(cont: Contestant): Observable<Contestant> {
        return this.service.updateContestant(cont);
    }

    public deleteContestant(id: number): Observable<Object> {
        return this.service.deleteContestant(id);
    }
}
