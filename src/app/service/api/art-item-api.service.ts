import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtItem } from 'src/app/model/art-item';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class ArtItemApiService {
    private apiServerUrl = environment.apiBaseUrl;
    postId!: number;
    status!: string;
    constructor(private http: HttpClient, private auth: AuthService) {}

    public getArtItems(): Observable<ArtItem[]> {
        return this.http.get<ArtItem[]>(`${this.apiServerUrl}/api/v1/item/`, this.auth.getHttpOptions());
    }

    public getArtItem(id: number): Observable<ArtItem> {
        return this.http.get<ArtItem>(`${this.apiServerUrl}/api/v1/item/${id}`, this.auth.getHttpOptions());
    }

    public addArtItem(artItem: ArtItem): Observable<ArtItem> {
        return this.http.post<ArtItem>(`${this.apiServerUrl}/api/v1/item/`, artItem, this.auth.getHttpOptions());
    }

    public updateArtItem(artItem: ArtItem): Observable<ArtItem> {
        return this.http.put<ArtItem>(`${this.apiServerUrl}/api/v1/item/${artItem.id}`, artItem, this.auth.getHttpOptions());
    }

    public deleteArtItem(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiServerUrl}/api/v1/item/${id}`, this.auth.getHttpOptions());
    }

    public getArtItemImageUrl(id: number): string {
        return `${this.apiServerUrl}/api/v1/item/image/${id}`;
    }

    public updateImage(id: number, upload: FormData): Observable<FormData> {
        return this.http.put<FormData>(`${this.apiServerUrl}/api/v1/item/update-image/${id}`, upload, this.auth.getHttpOptions());
    }
}
