import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent {
  public showSidenav = false;
  @Output() toggleSideNavButton = new EventEmitter<boolean>();

  toggleSideNav(val: any) {
    console.log('HEY THERE' + val);
    this.showSidenav = !this.showSidenav;
    this.toggleSideNavButton.emit(this.showSidenav);

    // this.showSidenav = !this.showSidenav;
  }
}
