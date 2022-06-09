import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationInfo } from 'src/app/model/association-info';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class AssociationInfoApiService {
    private apiBase: string = `${environment.apiBaseUrl}/api/v1/info/`;

    constructor(private http: HttpClient, private auth: AuthService) {}

    public getAllFields(): Observable<Map<String, String>> {
        return this.http.get<Map<String, String>>(`${this.apiBase}field`, this.getHeaders());
    }

    public getByField(field: string): Observable<String> {
        return this.http.get<String>(`${this.apiBase}field/${field}`, this.getHeaders());
    }

    public updateField(field: string, body: string): Observable<AssociationInfo> {
        return this.http.put<AssociationInfo>(`${this.apiBase}field/${field}`, body, this.getHeaders());
    }

    public addField(field: string, body: string): Observable<AssociationInfo> {
        return this.http.post<AssociationInfo>(`${this.apiBase}field/${field}`, body, this.getHeaders());
    }

    public delField(field: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiBase}field/${field}`, this.getHeaders());
    }

    public getAll(): Observable<AssociationInfo[]> {
        return this.http.get<AssociationInfo[]>(`${this.apiBase}`, this.getHeaders());
    }

    public getById(id: number): Observable<AssociationInfo> {
        return this.http.get<AssociationInfo>(`${this.apiBase}${id}`, this.getHeaders());
    }

    public deleteInfoItem(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiBase}${id}`, this.getHeaders());
    }

    public addInfoItem(infoItem: AssociationInfo): Observable<AssociationInfo> {
        return this.http.post<AssociationInfo>(`${this.apiBase}`, infoItem, this.getHeaders());
    }

    public updateInfoItem(infoItem: AssociationInfo): Observable<AssociationInfo> {
        return this.http.put<AssociationInfo>(`${this.apiBase}`, infoItem, this.getHeaders());
    }

    private getHeaders() {
        return { headers: this.auth.authHeaders };
    }
}
