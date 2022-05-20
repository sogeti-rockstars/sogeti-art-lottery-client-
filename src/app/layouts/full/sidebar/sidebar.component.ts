import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from 'src/app/component/menu-items/menu-items';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Input() public visible = false;
  @Output() public visibility = new EventEmitter<boolean>();

  constructor(
    public app: AppComponent,
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
    // this.menuItems.getMenuitem()[0].state;
    // this.menuItems.getMenuite
  }

  public toggleSideNav() {
    this.visible = !this.visible;
    this.visibility.emit(this.visible);

  }
}
