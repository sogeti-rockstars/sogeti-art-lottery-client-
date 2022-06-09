import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { ContestantService } from 'src/app/service/contestant.service';
import { LotteryService } from 'src/app/service/lottery.service';
import { runInThisContext } from 'vm';

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
    profileForm = this.fb.group({
        date: [''],
        title: [''],
        addContestants: [''],
    });
    constructor(private fb: FormBuilder, private contestantService: ContestantService, private lotteryService: LotteryService) {}

    onSubmit(event: any) {
        this.lottery = new Lottery();
        // if (event.addContestants == true) {
        //     this.contestantService.getContestants().subscribe((data: Contestant[]) => (this.lottery.contestants = data));
        // }
        this.lottery.title = event.title;
        this.lottery.date = event.date;
        this.lotteryService.addLottery(this.lottery);
    }

    updateForm(lottery: Lottery) {
        this.profileForm.patchValue({
            id: lottery.id,
            date: lottery.date,
            title: lottery.title,
        });
    }

    ngOnInit(): void {
        if (this.update == true) {
            this.lotteryService.getLottery(this.id).subscribe((resp) => {
                this.lottery = resp;
                this.updateForm(resp);
            });
        }
    }
}
