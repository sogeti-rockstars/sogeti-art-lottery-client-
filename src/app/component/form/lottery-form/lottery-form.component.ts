import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-lottery-form',
    templateUrl: './lottery-form.component.html',
    styleUrls: ['./lottery-form.component.css'],
})
export class LotteryFormComponent implements OnInit, OnDestroy {
    @Input() update: boolean = false;

    lottIndex!: number;
    profileForm = this.fb.group({
        title: [''],
    });

    private lottery!: Lottery;
    private lotteryChangedSubscription = new Subscription();

    constructor(private fb: FormBuilder, private lotteryService: LotteryService, private router: Router) {}

    onSubmit(event: any) {
        if (this.update == false) {
            this.lottery = new Lottery();
            this.lottery.title = event.title;
            this.lotteryService.addLottery(this.lottery).subscribe((resp) => {
                this.lotteryService.setCurrentLottery(resp.id);
                this.router.navigateByUrl('/admin/artitems');
            });
        } else {
            this.lottery.title = event.title;
            this.lotteryService.updateLottery(this.lottery).subscribe((_) => {
                this.lotteryService.detectChanges();
            });
        }
    }

    ngOnInit(): void {
        if (this.update == true) {
            this.lotteryChangedSubscription = this.lotteryService.lotteryChanged.subscribe((resp) => {
                this.updateForm(resp);
                this.lottery = resp;
            });
        }
    }

    ngOnDestroy(): void {
        this.lotteryChangedSubscription.unsubscribe();
    }

    deleteLottery() {
        this.lotteryChangedSubscription.unsubscribe();
        this.lotteryService.deleteLottery(this.lottery.id).subscribe();
        this.router.navigateByUrl('/');
    }

    private updateForm(lottery: Lottery) {
        this.profileForm.patchValue({
            id: lottery.id,
            title: lottery.title,
        });
        this.lottery = lottery;
    }
}
