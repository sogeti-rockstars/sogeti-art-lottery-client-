import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Lottery } from 'src/app/model/lottery';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-lottery-form',
    templateUrl: './lottery-form.component.html',
    styleUrls: ['./lottery-form.component.css'],
})
export class LotteryFormComponent implements OnInit {
    @Input() label!: string;
    @Input() inputPlaceholder!: string;
    @Input() lottery!: Lottery;
    @Output() artItemOutput = new EventEmitter<Lottery>();
    @Input() update: boolean = false;
    @Input() id!: number;
    lotId!: number;
    profileForm = this.fb.group({
        title: [''],
    });
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private lotteryService: LotteryService) {}

    onSubmit(event: any) {
        console.log(event);
        if (this.update == false) {
            this.lottery = new Lottery();
            this.lottery.title = event.title;
            this.lotteryService.addLottery(this.lottery).subscribe((resp) => {
                console.log(resp);
                //försökte setCurrentLottery(resp.id) men den gillade inte det av någon anledning
            });
        } else
            this.lotteryService.getLottery(this.id).subscribe((resp) => {
                this.lottery = resp;
                this.lottery.title = event.title;
                this.lotteryService.updateLottery(this.lottery).subscribe((resp) => {
                    this.lotteryService.setCurrentLottery(this.id - 1);
                });
            });
    }

    getLottery(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.id = id;
    }

    updateForm(lottery: Lottery) {
        this.profileForm.patchValue({
            id: lottery.id,
            title: lottery.title,
        });
        this.getLottery();
    }

    ngOnInit(): void {
        if (this.update == true) {
            this.lotteryService.lotteryChanged.subscribe((resp) => {
                this.updateForm(resp);
            });
        }
    }
}
