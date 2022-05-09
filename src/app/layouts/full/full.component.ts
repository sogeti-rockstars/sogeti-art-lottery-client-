import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from 'src/app/component/menu-items/menu-items';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  Output,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.css'],
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  @Output()
  public showSidenav: boolean = false;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  toggleSideNav(): boolean {
    console.log('HEY THERE2' + this.showSidenav);
    this.showSidenav = !this.showSidenav;
    return this.showSidenav;
  }
}
