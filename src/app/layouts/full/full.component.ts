import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MenuItems } from 'src/app/component/menu-items/menu-items';


@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['full.component.css'],
})
export class FullComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    public sideNavVisible = false;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public toggleSideNav() {
        this.sideNavVisible = !this.sideNavVisible;
    }

    public toggleSideNavValue(visibility: boolean) {
        this.sideNavVisible = visibility;
    }
}
