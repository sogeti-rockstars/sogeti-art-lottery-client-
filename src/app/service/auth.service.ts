import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiServerUrl = environment.apiBaseUrl;
    authenticated = false;
    private authHeaders$!: HttpHeaders | undefined;
    get authHeaders() {
        console.log(this.authHeaders$);
        return this.authHeaders$;
    }

    public loginLogoutChanged = new EventEmitter<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    login() {
        this.authHeaders$ = new HttpHeaders();
        this.authHeaders$.append('Access-Control-Allow-Credentials', 'true');
        this.authHeaders$ = this.authHeaders$.set('Content-Type', 'application/json');
        this.authHeaders$ = this.authHeaders$.set('Authorization', 'Basic ' + btoa('admin:admin'));
        this.http.get(`${this.apiServerUrl}/user`, { headers: this.authHeaders }).subscribe((d) => {
            this.authenticated = true;
            console.log(d);
        });
    }
    logout() {
        this.http.get(`${this.apiServerUrl}/logout`, { headers: this.authHeaders }).subscribe(() => {
            this.authenticated = false;
            this.authHeaders$ = undefined;
            this.router.navigateByUrl('/');
        });
    }
}
