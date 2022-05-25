import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authenticated = true;
    authHeaders: HttpHeaders | undefined;

    public loginLogoutChanged = new EventEmitter<boolean>();

    constructor(private router: Router) {}

    get isAdmin() {
        return this.router.url.search(/admin/) > 0;
    }

    login() {
        this.authenticated = true;
    }
    logout() {
        this.authenticated = false;
    }
}
