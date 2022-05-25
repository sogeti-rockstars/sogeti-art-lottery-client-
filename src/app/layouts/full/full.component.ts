import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['full.component.css'],
})
export class FullComponent {
    public sideNavVisible!: boolean;

    public sidebarVisibleClicked = new EventEmitter<boolean>();

    constructor() {}

    public toggleSideNav(newVal?: boolean) {
        this.sideNavVisible = newVal === undefined ? !this.sideNavVisible : newVal;
    }
}
