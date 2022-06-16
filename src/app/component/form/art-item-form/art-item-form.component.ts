import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    @Input() onSubmit = (artItem: ArtItem) => {
        artItem.lotteryId = this.lotteries[this.selected - 1].id;
        this.artItemService.add(artItem).subscribe((data) => {
            if (this.file != null) this.onUpload(data);
            this.matDialog.closeAll();
        });
    };
    @Output() artItemOutput = new EventEmitter<ArtItem>();
    update: boolean = false;
    selected!: number;
    lotteries: Lottery[] = [];
    file: any;
    imgURL: any;
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
        return this.itemApiService.getArtItemImageUrl(this.artItem.id!);
    }

    onFileChanged(event: any) {
        console.log(event);
        this.file = event.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_) => {
            this.imgURL = reader.result;
        };
    }

    onUpload(artItem: ArtItem) {
        const formData: FormData = new FormData();
        formData.append('image', <File>this.file);
        formData.append('newImage', new Blob([this.file], { type: 'application/json' }));
        this.artItemService.setImage(artItem, formData).subscribe((resp) => resp);
    }

    updateForm() {
        this.profileForm.patchValue({
            id: this.artItem.id,
            lottery_id: this.artItem.lotteryId,
            itemName: this.artItem.itemName,
            artistName: this.artItem.artistName,
            size: this.artItem.size,
            frameDescription: this.artItem.frameDescription,
            value: this.artItem.value,
            technique: this.artItem.technique,
        });
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
