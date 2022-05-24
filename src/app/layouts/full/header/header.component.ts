import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements AfterViewInit {
    private sidebarVisible$ = false;
    public get sidebarVisible() {
        return this.sidebarVisible$;
    }
    @Input()
    public set sidebarVisible(val: boolean) {
        this.sidebarVisible$ = val;
        this.sidebarVisibleChange.emit(val);
    }
    @Output() sidebarVisibleChange = new EventEmitter<boolean>();

    public readonly menuItems = menuItems;

    toggleSideButtonElem!: HTMLElement;
    constructor(public app: AppComponent, private router: Router, private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit(): void {
        // this.toggleSideButtonElem = document.getElementById('toggleSide')!;
        this._focusMonitor.stopMonitoring(document.getElementById('toggleSide')!);
    }

    public doAction(menuitem: MenuItem, event: MouseEvent) {
        event.stopImmediatePropagation();
        if (menuitem.action === 'toggleSide') {
            this.sidebarVisible = !this.sidebarVisible;
        } else {
            this.router.navigateByUrl(menuitem.route);
        }
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
