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
  templateUrl: 'spinner.component.html',
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
