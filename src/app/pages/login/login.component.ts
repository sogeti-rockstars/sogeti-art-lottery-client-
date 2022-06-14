import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    credentials = { username: '', password: '' };
    passFailed = false;
    private loginStateChangedSubs = new Subscription();

    constructor(public authService: AuthService, private router: Router) {}

    ngOnDestroy(): void {
        this.loginStateChangedSubs.unsubscribe();
    }

    ngOnInit(): void {
        this.loginStateChangedSubs = this.authService.loginLogoutChanged.subscribe((state) => {
            if (!state) return;
            let nUrl = '/admin/' + this.router.url.split('?from=').slice(-1);
            this.router.navigate([nUrl], { queryParams: {} });
        });
    }

    public submit() {
        this.authService.login(this.credentials.username, this.credentials.password).subscribe({
            error: (_) => (this.passFailed = true),
        });
    }
}
