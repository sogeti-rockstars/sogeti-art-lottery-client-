import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationInfo } from '../model/association-info';
import { AssociationInfoApiService } from './api/association-info-api.service';

@Injectable({
    providedIn: 'root',
})
export class AssociationInfoService {
    constructor(private service: AssociationInfoApiService) {}

    public getAllFields(): Observable<Map<String, String>> {
        return this.service.getAllFields();
    }

    public getByField(field: string): Observable<String> {
        return this.service.getByField(field);
    }

    public updateField(field: string, body: string): Observable<AssociationInfo> {
        return this.service.updateField(field, body);
    }

    public addField(field: string, body: string): Observable<AssociationInfo> {
        return this.service.addField(field, body);
    }

    public delField(field: string): Observable<boolean> {
        return this.service.delField(field);
    }

    public getAll(): Observable<AssociationInfo[]> {
        return this.service.getAll();
    }

    public getById(id: number): Observable<AssociationInfo> {
        return this.service.getById(id);
    }

    public deleteInfoItem(id: number): Observable<boolean> {
        return this.service.deleteInfoItem(id);
    }

    public addInfoItem(infoItem: AssociationInfo): Observable<AssociationInfo> {
        return this.service.addInfoItem(infoItem);
    }

    public updateInfoItem(infoItem: AssociationInfo): Observable<AssociationInfo> {
        return this.service.updateInfoItem(infoItem);
    }
}
