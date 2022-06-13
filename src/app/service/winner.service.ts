import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Winner } from 'src/app/model/winner';
import { WinnerApiService } from './api/winner-api.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class WinnerService {
    @Output() winnerChanged = new EventEmitter<Winner>();

    constructor(private http: HttpClient, private auth: AuthService, private winnerApiService: WinnerApiService) {}

    public updateWinner(winner: Winner): Observable<Winner> {
        return this.winnerApiService.updateWinner(winner).pipe(tap((resp: Winner) => this.winnerChanged.emit(resp)));
    }
}
