import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-spinning-wheel',
    templateUrl: './spinning-wheel.component.html',
    styleUrls: ['./spinning-wheel.component.scss'],
})
export class SpinningWheelComponent implements AfterContentChecked {
    @Output() onAnimationEnd = new EventEmitter<void>();
    readonly circleSections = 8;

    @Input() show = true; // Used to restart the animation by hiding it very temporarily.
    @Input() animationsPlayState = false;
    @Input() animationControlEvent!: EventEmitter<number>;

    @ViewChildren('circle') private circles!: QueryList<ElementRef<HTMLDivElement>>;

    private stoppedAnimationOnInit = false;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentChecked(): void {
        this.animationControlEvent.subscribe((ev) => {
            if (ev == -1) this.animationRestart();
        });
        if (!this.stoppedAnimationOnInit && this.circles !== undefined) {
            this.animationControl(this.animationsPlayState);
            this.stoppedAnimationOnInit = true;
        }
    }

    public animationEndHandler(event: any) {
        if (event.target.getAnimations().length == 0 && event.target.id === 'circle1') this.onAnimationEnd.emit();
    }

    /**
     * @param play Optional: play/pause animation, skip to toggle.
     */
    public animationControl(play?: boolean) {
        this.animationsPlayState = play !== undefined ? play : !this.animationsPlayState;
        let newState = this.animationsPlayState ? 'running' : 'paused';
        Array.from(this.circles).forEach((c) => (c.nativeElement.style.animationPlayState = newState));
    }

    private animationRestart() {
        this.show = false;
        this.cdr.detectChanges();
        this.show = true;
    }
}
