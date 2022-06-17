import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LotteryStartComponent } from 'src/app/pages/lottery-start/lottery-start.component';

@Component({
    selector: 'app-spinning-wheel',
    templateUrl: './spinning-wheel.component.html',
    styleUrls: ['./spinning-wheel.component.scss'],
})
export class SpinningWheelComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() onAnimationEnd = new EventEmitter<void>();
    readonly circleSections = 8;

    @Input() animationControlEvent!: EventEmitter<number>;

    @ViewChild('circleContainer') private circleContainer!: ElementRef<HTMLDivElement>;

    @Input() parentComponent!: LotteryStartComponent;

    private animationControlEventSubscription?: Subscription;
    private animate = false;

    ngAfterViewInit(): void {
        this.circleContainer.nativeElement.style.opacity = '0';
        this.circleContainer.nativeElement.addEventListener('animationstart', (ev) => {
            if (this.animate || ev.animationName != 'spin1') return;
            this.circleContainer.nativeElement.classList.add('circle-paused');
            this.circleContainer.nativeElement.style.opacity = '1';
            this.parentComponent.showButton();
        });
    }

    ngOnDestroy(): void {
        if (this.animationControlEventSubscription?.closed) this.animationControlEventSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.animationControlEventSubscription = this.animationControlEvent.subscribe((ev) => {
            if (ev == -1) this.animationRestart();
        });
    }

    public animationEndHandler() {
        Array.from(this.circleContainer.nativeElement.children)
            .map((c) => c as HTMLDivElement)
            .forEach((c) => {
                c.style.animation = 'none';
                c.offsetHeight;
                c.style.animation = '';
            });
        this.animate = false;
        this.onAnimationEnd.emit();
    }

    private animationRestart() {
        this.circleContainer.nativeElement.classList.remove('circle-paused');
        setTimeout(() => this.animationEndHandler(), 6700);
        this.animate = true;
    }
}
