import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent {
  constructor(public app: AppComponent) {}
  @Output() toggleSideNav = new EventEmitter<void>();


  // toggleSideNav(val: any) {
  //   console.log('HEY THERE' + val);
  //   this.showSidenav = !this.showSidenav;
  //   // this.toggleSideNavButton.emit(this.showSidenav);
  // }
}
