import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { Contestant } from 'src/app/model/contestant';
import { Lottery } from 'src/app/model/lottery';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { LotteryApiService } from 'src/app/service/api/lottery-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { ContestantService } from 'src/app/service/contestant.service';

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
    update: boolean = false;
    profileForm = this.fb.group({
        date: [''],
        title: [''],
        addContestants: [''],
    });
    constructor(private fb: FormBuilder, private contestantService: ContestantService, private lotteryApiService: LotteryApiService) {}

    onSubmit(event: any) {
        this.lottery = new Lottery();
        if (event.addContestants == true) {
            this.contestantService.getContestants().subscribe((data: Contestant[]) => (this.lottery.contestants = data));
        }
        this.lottery.title = event.title;
        this.lottery.date = event.date;
        this.lotteryApiService.addLottery(this.lottery);
    }

    updateForm() {
        this.profileForm.patchValue({
            id: this.lottery,
            date: [''],
            title: [''],
        });
    }

    ngOnInit(): void {
        if (this.lottery != undefined) {
            this.updateForm();
            this.update = true;
            console.log('lottery is not null');
        }
    }
}
