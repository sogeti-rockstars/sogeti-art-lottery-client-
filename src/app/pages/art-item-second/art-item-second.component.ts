import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtItem } from 'src/app/model/art-item';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-art-item-second',
    templateUrl: './art-item-second.component.html',
    styleUrls: ['./art-item-second.component.css'],
})
export class ArtItemSecondComponent implements OnInit, OnDestroy {
    guaranteePrize?: ArtItem;
    authenticated?: boolean;
    lotteryId?: number;
    private lotteryChangedSubscription = new Subscription();

    constructor(private lotteryService: LotteryService, private authService: AuthService) {}

    ngOnDestroy(): void {
        this.lotteryChangedSubscription.unsubscribe();
    }
    ngOnInit(): void {
        this.authenticated = this.authService.authenticated;
        this.updateCurrGuaranteePrize();
        this.lotteryChangedSubscription = this.lotteryService.lotteryChanged.subscribe((_) => this.updateCurrGuaranteePrize());
    }

    setGuaranteePrize(item: ArtItem) {
        this.lotteryService.setGuaranteePrize(this.lotteryService.currLotteryId!, item).subscribe((r) => console.log(r));
    }

    private updateCurrGuaranteePrize() {
        if (this.lotteryService.currLotteryId !== undefined) {
            this.guaranteePrize = undefined;
            this.lotteryId = this.lotteryService.currLotteryId;
            this.lotteryService.getGuaranteePrize(this.lotteryService.currLotteryId!).subscribe((r) => {
                if (r !== null) this.guaranteePrize = r;
                else this.guaranteePrize = new ArtItem();
            });
        } else this.lotteryService.setCurrentLotteryIndex(0);
    }
}
