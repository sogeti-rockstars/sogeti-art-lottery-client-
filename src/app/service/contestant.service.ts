import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contestant } from '../model/contestant';
import { ContestantApiService } from './api/contestant-api.service';

@Injectable({
    providedIn: 'root',
})
export class ContestantService {
    @Output() contestantsChanged = new EventEmitter<Contestant[]>();

    constructor(private service: ContestantApiService) {}

    public getContestants(): Observable<Contestant[]> {
        return this.service.getContestants();
    }

    public getContestant(id: number): Observable<Contestant> {
        return this.service.getContestant(id);
    }

    // There is a bug on the back-end, any lists submitted as responses seem unreliable...
    public addContestant(cont: Contestant): Observable<Contestant> {
        return this.service.addContestant(cont).pipe(
            tap((_) =>
                this.getContestants().subscribe((contestants) => {
                    this.contestantsChanged.emit(contestants);
                })
            )
        );
    }

    public updateContestant(cont: Contestant): Observable<Contestant> {
        return this.service.updateContestant(cont).pipe(
            tap((_) =>
                this.getContestants().subscribe((contestants) => {
                    this.contestantsChanged.emit(contestants);
                })
            )
        );
    }

    public deleteContestant(id: number): Observable<Object> {
        return this.service.deleteContestant(id).pipe(
            tap((_) =>
                this.getContestants().subscribe((contestants) => {
                    this.contestantsChanged.emit(contestants);
                })
            )
        );
    }
}
