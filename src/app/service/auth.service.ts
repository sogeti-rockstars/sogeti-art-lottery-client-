import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public get authenticated() {
        return this.authenticated$;
    }
    public readonly loginLogoutChanged = new EventEmitter<boolean>();

    private authenticated$ = false;
    private apiServerUrl = environment.apiBaseUrl;
    private authHeaders!: HttpHeaders;

    constructor(private http: HttpClient, private router: Router) {
        this.login('admin', 'admin');
        this.checkAuthentication(); // this.login('admin', 'admin');
    }

    login(user: string, pass: string) {
        this.authHeaders = new HttpHeaders();
        this.authHeaders = this.authHeaders.set('Authorization', 'Basic ' + btoa(`${user}:${pass}`));

        return this.http.get(`${this.apiServerUrl}/api/v1/users/current`, { headers: this.authHeaders, observe: 'response' }).pipe(
            tap({
                next: (_) => {
                    this.authenticated$ = true;
                    this.loginLogoutChanged.emit(true);
                },
                error: (_) => {
                    this.authHeaders = new HttpHeaders();
                },
                complete: () => {},
            })
        );
    }

    logout() {
        this.router.navigateByUrl('/');
        this.http.put(`${this.apiServerUrl}/api/v1/users/logout`, '', this.getHttpOptions()).subscribe((_) => {
            this.authenticated$ = false;
            this.authHeaders = new HttpHeaders();
            this.loginLogoutChanged.emit(false);
        });
    }

    getHttpOptions(): { headers?: HttpHeaders; withCredentials?: boolean | undefined } {
        return { headers: this.authHeaders, withCredentials: this.authenticated };
    }

    private checkAuthentication() {
        this.http.get<any>(`${this.apiServerUrl}/api/v1/users/current`, { headers: this.authHeaders, withCredentials: true }).subscribe({
            next: (r) => {
                console.log(r.name);
                if (r.name === 'admin') this.authenticated$ = true;
            },
        });
    }
}
