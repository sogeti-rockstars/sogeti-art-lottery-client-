import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contestant } from 'src/app/model/contestant';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class ContestantApiService {
    private apiBase: string = `${environment.apiBaseUrl}/api/v1/contestant/`;
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getContestants(): Observable<Contestant[]> {
        return this.httpGet();
    }

    public getContestant(id: number): Observable<Contestant> {
        return this.httpGet(id);
    }

    public addContestant(cont: Contestant): Observable<Contestant> {
        return this.httpPost(cont);
    }

    public updateContestant(cont: Contestant): Observable<Contestant> {
        return this.httpPut<Contestant>(cont, cont.id);
    }

    public deleteContestant(id: number): Observable<Object> {
        return this.httpDel(id);
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
        return this.auth.getHttpOptions();
    }
}
