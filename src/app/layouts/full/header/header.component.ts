import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent {
  menuItems: MenuItem[] = [
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

  constructor(public app: AppComponent, private router: Router) {}
  @Output() toggleSideNav = new EventEmitter<void>();

  public doAction(menuitem: MenuItem) {
    if (menuitem.action === 'toggleSide') {
      this.toggleSide();
    } else {
      this.showRoute(menuitem.route);
    }
  }
  public toggleSide() {
    this.toggleSideNav.emit();
  }

  public showRoute(route: string) {
    this.router.navigateByUrl(route);
  }
  // toggleSideNav(val: any) {
  //   console.log('HEY THERE' + val);
  //   this.showSidenav = !this.showSidenav;
  //   // this.toggleSideNavButton.emit(this.showSidenav);
  // }
}
export interface MenuItem {
  route: string;
  label: string;
  icon: string;
  cls: string;
  limitedTo: string /*admin, user or blank (=not limited to any user group)*/;
  action: string;
}
