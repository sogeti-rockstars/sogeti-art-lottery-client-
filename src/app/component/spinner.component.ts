import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-spinner',
  template: `<mat-progress-spinner *ngIf="isSpinnerVisible">
  </mat-progress-spinner>`,
  // <div class="preloader" *ngIf="isSpinnerVisible">
  //   <div class="spinner">
  //
  //     <div class="double-bounce1"></div>
  //     <div class="double-bounce2"></div>
  //   </div>
  // </div>`,
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;

  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (event) => {
        console.log(event);
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
