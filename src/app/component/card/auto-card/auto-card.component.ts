import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { Lottery } from 'src/app/model/lottery';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-auto-card',
    templateUrl: './auto-card.component.html',
    styleUrls: ['./auto-card.component.css'],
})
export class AutoCardComponent implements OnInit {
    object: any;
    objectContent: any[] = [];
    values: string[] = [];
    variableNames: string[] = [];
    prettyVarNames: string[] = [];
    panelClass: string;
    editMode!: boolean;
    lotteries: Lottery[] = [];
    lottery!: Lottery;
    file: any;
    imgURL: any;
    selected!: number;
    // profileForm = this.fb.group({ aliases: this.fb.array([this.fb.control('')]) });
    profileForm = this.fb.group(this.fb.control('wtf'));

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService,
        private matDialog: MatDialog,
        private lotteryService: LotteryService
    ) {
        this.panelClass = 'custom-dialog-container';
    }

    enableEdit() {
        this.editMode = true;

        if (this.lotteryService.currLotteryId !== undefined)
            this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => (this.selected = lottery.id));
    }

    onFileChanged(event: any) {
        this.file = event.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_) => {
            this.imgURL = reader.result;
        };
    }

    onSubmit(item: ArtItem) {
        item.lottery = this.lotteries[this.selected];
        item.lotteryId = this.selected;
        this.artItemService.observeUpdateArtItem(item).subscribe((data: ArtItem) => {
            if (this.file != null) this.onUpload(data);
            this.matDialog.closeAll();
        });
    }

    onUpload(artItem: ArtItem) {
        const formData: FormData = new FormData();
        formData.append('image', <File>this.file);
        formData.append('newImage', new Blob([this.file], { type: 'application/json' }));
        this.artItemService.setImage(artItem, formData).subscribe((resp) => resp);
    }

    ngOnInit(): void {
        this.editMode = false;
        this.loadImageUrl();
        this.objectValueExtraction();
        this.formCreation();
        this.lotteryService.getLotteriesSummary().subscribe((resp) => (this.lotteries = resp));
    }

    private formCreation() {
        for (let i = 0; i < this.objectContent.length; i++) {
            this.profileForm.addControl(this.variableNames[i], this.fb.control(this.values[i]));
        }
        this.profileForm.patchValue({ value: this.values[6] });
    }

    private objectValueExtraction() {
        this.objectContent = Object.entries(this.object);
        this.values = this.objectContent.map(function (value, _) {
            if (value[0].toLowerCase().indexOf('lotteryId') != -1) {
                if (typeof value[1] === 'object' && value[1] != null) {
                    return value[1].title;
                }
            }
            return value[1];
        });
        this.variableNames = this.objectContent.map(function (value, _) {
            return value[0];
        });
        for (let i = 0; i < this.variableNames.length; i++) {
            this.prettyVarNames[i] = this.variableNames[i].replace(/([A-Z])/g, ' $1');
            this.prettyVarNames[i] = this.prettyVarNames[i].charAt(0).toUpperCase() + this.prettyVarNames[i].slice(1);
        }
    }

    loadImageUrl() {
        this.imgURL = this.itemApiService.getArtItemImageUrl(this.object.id);
    }
}
