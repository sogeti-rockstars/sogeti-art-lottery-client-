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
    private loginStateChangedSubs = new Subscription();

    constructor(public authService: AuthService, private router: Router) {}

    ngOnDestroy(): void {
        console.log('unsub');
        this.loginStateChangedSubs.unsubscribe();
    }

    ngOnInit(): void {
        this.loginStateChangedSubs = this.authService.loginLogoutChanged.subscribe((state) => {
            if (state == true) this.router.navigateByUrl('/admin/' + this.router.url.split('?from=').slice(-1));
        });
    }

    public submit() {
        this.authService.login(this.credentials.username, this.credentials.password);
    }
}
