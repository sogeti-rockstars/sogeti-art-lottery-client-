import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Winner } from 'src/app/model/winner';
import { WinnerApiService } from './api/winner-api.service';

@Injectable({
    providedIn: 'root',
})
export class WinnerService {
    @Output() winnerChanged = new EventEmitter<Winner>();

    constructor(private winnerApiService: WinnerApiService) {}

    public updateWinner(winner: Winner): Observable<Winner> {
        console.log(winner);
        return this.winnerApiService.updateWinner(winner).pipe(tap((resp: Winner) => this.winnerChanged.emit(resp)));
    }
}
