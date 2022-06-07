import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contestant } from '../model/contestant';
import { ContestantApiService } from './api/contestant-api.service';
import { LotteryService } from './lottery.service';

@Injectable({
    providedIn: 'root',
})
export class ContestantService {
    @Output() contestantsChanged = new EventEmitter<Contestant[]>();

    constructor(private service: ContestantApiService, private lotteryService: LotteryService) {}

    public getContestants(): Observable<Contestant[]> {
        return this.service.getContestants();
    }

    public getContestant(id: number): Observable<Contestant> {
        return this.service.getContestant(id);
    }

    public addContestant(cont: Contestant): Observable<Contestant> {
        return this.service.addContestant(cont).pipe(tap(this.getContestants().subscribe((contestants) => this.contestantsChanged.emit(contestants))));
    }

    public updateContestant(cont: Contestant): Observable<Contestant> {
        return this.service.updateContestant(cont);
    }

    public deleteContestant(id: number): Observable<Object> {
        return this.service.deleteContestant(id);
    }
}
