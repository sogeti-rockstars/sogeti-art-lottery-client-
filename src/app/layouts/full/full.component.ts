import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['full.component.css'],
})
export class FullComponent {
    private sideNavVisible$!: boolean;
    public get sideNavVisible() {
        return this.sideNavVisible$;
    }
    public set sideNavVisible(val: boolean) {
        this.sideNavVisible$ = val;
        this.sideNavVisibleChange.emit(val);
    }
    public sideNavVisibleChange = new EventEmitter<boolean>();

    constructor() {}

    public toggleSideNav(newVal?: boolean) {
        this.sideNavVisible = newVal === undefined ? !this.sideNavVisible : newVal;
    }
}
