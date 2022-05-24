import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FullComponent } from '../full.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements AfterViewInit {
    @Input() parent!: FullComponent;
    public readonly menuItems = menuItems;

    constructor(public app: AppComponent, private router: Router, private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit(): void {
        this._focusMonitor.stopMonitoring(document.getElementById('toggleSide')!);
    }

    public doAction(menuitem: MenuItem, event: MouseEvent) {
        event.stopImmediatePropagation();
        if (menuitem.action === 'toggleSide') {
            this.parent.toggleSideNav();
        } else {
            this.showRoute(menuitem.route);
        }
    }

    public showRoute(route: string) {
        this.router.navigateByUrl(route);
    }
}

const menuItems: MenuItem[] = [
    {
        route: 'artitems',
        label: 'Norrkonst',
        icon: 'notes',
        cls: 'header-buttons',
        limitedTo: '',
        action: 'toggleSide',
    },
    {
        route: 'artitems',
        label: 'Konstverk',
        icon: '',
        cls: 'header-buttons',
        limitedTo: '',
        action: 'showRoute',
    },
    {
        route: 'winners',
        label: 'Vinnare',
        icon: '',
        cls: 'header-buttons',
        limitedTo: '',
        action: 'showRoute',
    },
    {
        route: 'association',
        label: 'Om föreningen',
        icon: '',
        cls: 'header-buttons',
        limitedTo: 'user',
        action: 'showRoute',
    },
    {
        route: 'appmembers',
        label: 'Medlemmar',
        icon: '',
        cls: 'header-buttons',
        limitedTo: 'admin',
        action: 'showRoute',
    },
    {
        route: 'applottery',
        label: 'Starta lotteri',
        icon: '',
        cls: 'header-buttons',
        limitedTo: 'admin',
        action: 'showRoute',
    },
    {
        route: '',
        label: 'Logga ut',
        icon: '',
        cls: 'header-btn-logout',
        limitedTo: 'admin',
        action: '',
    },
];

export interface MenuItem {
    route: string;
    label: string;
    icon: string;
    cls: string;
    limitedTo: string /*admin, user or blank (=not limited to any user group)*/;
    action: string;
}
