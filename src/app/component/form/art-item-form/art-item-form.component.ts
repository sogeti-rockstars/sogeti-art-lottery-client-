import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { Lottery } from 'src/app/model/lottery';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-art-item-form',
    templateUrl: './art-item-form.component.html',
    styleUrls: ['./art-item-form.component.css'],
})
export class ArtItemFormComponent implements OnInit {
    @Input() label!: string;
    @Input() inputPlaceholder!: string;
    @Input() artItem!: ArtItem;
    @Output() artItemOutput = new EventEmitter<ArtItem>();
    update: boolean = false;
    selected!: number;
    lotteries: Lottery[] = [];
    profileForm = this.fb.group({
        id: [''],
        lottery_id: [''],
        itemName: ['', Validators.required],
        pictureUrl: [''],
        artistName: [''],
        size: [''],
        frameDescription: [''],
        value: [''],
        technique: [''],
    });

    constructor(
        private fb: FormBuilder,
        private artItemService: ArtItemService,
        private itemApiService: ArtItemApiService,
        private matDialog: MatDialog,
        private lotteryService: LotteryService
    ) {}

    loadImageUrl() {
        return this.itemApiService.getArtItemImageUrl(this.artItem.id);
    }

    onFileChanged(event: any) {
        console.log(event);
        const file = event.target.files[0];
    }

    onSubmit(artItem: ArtItem) {
        // if (this.update == true) {
        //     console.log('update is true');
        //     this.artItemService.observeUpdateArtItem(artItem).subscribe((data) => {
        //         console.log(data.id);
        //         this.matDialog.closeAll();
        //     });
        // }
        // if (this.update == false) {
        // this.artItemService.observeAddArtItem(artItem).subscribe((data) => {
        //     console.log(data.id);
        //     if (this.lotteryService.currLotteryId !== undefined) {
        //         this.lotteryService.addItemToLottery(this.lotteryService.currLotteryId, data).subscribe((resp) => console.log(resp));
        //     }
        // });
        console.log(artItem);
        artItem.lottery_id = this.selected;
        this.lotteryService.addItemToLottery(this.selected, artItem).subscribe((data) => {
            console.log(data.title);
            this.matDialog.closeAll();
        });
        // }
    }

    updateForm() {
        this.profileForm.patchValue({
            id: this.artItem.id,
            lottery_id: this.artItem.lottery_id,
            itemName: this.artItem.itemName,
            artistName: this.artItem.artistName,
            size: this.artItem.size,
            frameDescription: this.artItem.frameDescription,
            value: this.artItem.value,
            technique: this.artItem.technique,
        });
        console.log(this.artItem.itemName + 'updateForm');
    }

    ngOnInit(): void {
        if (this.artItem != undefined) {
            this.updateForm();
            this.update = true;
            console.log('artitem is not null');
        }
        this.lotteryService.getLotteriesSummary().subscribe((resp) => (this.lotteries = resp));
        if (this.lotteryService.currLotteryId !== undefined)
            this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => (this.selected = lottery.id));
    }
}
