import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiServerUrl = environment.apiBaseUrl;
    authenticated = true;
    private authHeaders$!: HttpHeaders | undefined;
    get authHeaders() {
        this.authHeaders$ = new HttpHeaders();
        this.authHeaders$ = this.authHeaders$.set('Authorization', 'Basic ' + btoa(`admin:admin`));
        return this.authHeaders$;
    }

    public loginLogoutChanged = new EventEmitter<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    login(user: string, pass: string) {
        this.authHeaders$ = new HttpHeaders();
        this.authHeaders$ = this.authHeaders$.set('Authorization', 'Basic ' + btoa(`${user}:${pass}`));

        this.http.get(`${this.apiServerUrl}/user`, { headers: this.authHeaders }).subscribe({
            next: (_) => {
                this.authenticated = true;
                this.loginLogoutChanged.emit(true);
            },
            error: (_) => {
                this.authHeaders$ = undefined;
            },
        });
    }

    logout() {
        this.router.navigateByUrl('/');
        this.http.put(`${this.apiServerUrl}/user/logout`, '', { headers: this.authHeaders }).subscribe((_) => {
            this.authenticated = false;
            this.authHeaders$ = undefined;
            this.loginLogoutChanged.emit(false);
        });
    }
}
