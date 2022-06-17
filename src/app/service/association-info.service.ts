import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssociationInfoApiService } from './api/association-info-api.service';
@Injectable({
    providedIn: 'root',
})
export class AssociationInfoService {
    private fieldsChangedEmitter = new EventEmitter<AssociationInfoService>();
    private cacheMap!: Map<string, string>;
    private subscriptions = new Map<Object, Subscription>();

    constructor(private service: AssociationInfoApiService) {
        this.service.getAllFields().subscribe((resp) => {
            this.cacheMap = new Map(Object.entries(resp));
        });
    }

    public unsubscribe(subscriber: Object) {
        this.subscriptions.get(subscriber)?.unsubscribe();
    }

    public subscribe(subscriber: Object, receiver: (newData: AssociationInfoService) => void) {
        let subscription = this.fieldsChangedEmitter.subscribe(receiver);
        if (this.cacheMap !== undefined) receiver(this);
        else
            this.service.getAllFields().subscribe((resp) => {
                this.cacheMap = new Map(Object.entries(resp));
                receiver(this);
            });
        this.subscriptions.set(subscriber, subscription);
        return subscription;
    }

    public getField(field: string) {
        if (!this.ensureCache(field, '', this.updateField)) return '';
        let resp = this.cacheMap.get(field);
        return resp !== undefined ? resp : '';
    }

    /**
     * Acts like a map, i.e. no errors when the field didn't exist!
     */
    public setField(field: string, body: string) {
        if (!this.ensureCache(field, body, this.setField)) return;
        if (this.cacheMap.get(field) === undefined) this.addField(field, body);
        else this.updateField(field, body);
    }

    public updateField(field: string, body: string): void {
        if (!this.ensureCache(field, body, this.updateField)) return;
        this.service.updateField(field, body).subscribe((_) => {
            this.cacheMap!.set(field, body);
            this.fieldsChangedEmitter.emit(this);
        });
    }

    public addField(field: string, body: string): void {
        if (!this.ensureCache(field, body, this.addField)) return;
        this.service.addField(field, body).subscribe((_) => {
            this.cacheMap!.set(field, body);
            this.fieldsChangedEmitter.emit(this);
        });
    }

    public delField(field: string, _: string) {
        if (!this.ensureCache(field, '', this.delField)) return;
        this.service.delField(field).subscribe((_) => {
            this.cacheMap!.delete(field);
            this.fieldsChangedEmitter.emit(this);
        });
    }

    private ensureCache(field: string, body: string, caller: (field: string, body: string) => void) {
        if (this.cacheMap !== undefined) return true;
        this.service.getAllFields().subscribe((resp) => {
            this.cacheMap = new Map(Object.entries(resp));
            caller(field, body);
        });
        return false;
    }
}
