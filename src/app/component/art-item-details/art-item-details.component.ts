import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { Lottery } from 'src/app/model/lottery';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';

interface ArtItemDetailsViewData {
    inEditMode?: boolean;
    isAdmin?: boolean;
    isThumbnail?: boolean;
}

@Component({
    selector: 'art-item-details',
    templateUrl: './art-item-details.component.html',
    styleUrls: ['./art-item-details.component.css'],
})
export class ArtItemDetailsComponent implements OnInit {
    file: any;
    imgURL: any;

    fieldnames: { key: string; value: string }[] = [];

    @Input() onClickOverride?: (artItemComp: ArtItemDetailsComponent) => void;

    @Input() data!: ArtItem;
    @Input() viewData: ArtItemDetailsViewData = { inEditMode: false, isAdmin: false };
    @Input() dataa!: { file: string; imgUrl: string };

    @Input() lotteries: Lottery[] = [];

    // profileForm = this.fb.group({ aliases: this.fb.array([this.fb.control('')]) });
    profileForm = this.fb.group(this.fb.control('wtf'));

    constructor(
        private fb: FormBuilder,
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService,
        private matDialog: MatDialog, // private lotteryService: LotteryService
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        data?: ArtItem
    ) {
        if (data !== undefined) this.data = data;
    }

    ngOnInit(): void {
        Object.entries(this.data).forEach((entr) => {
            this.fieldnames.push({ key: entr[0], value: entr[1] as string });
        });
        this.loadImageUrl();
    }

    onClick() {
        console.log('image clicked!');
        if (this.onClickOverride != undefined) this.onClickOverride(this);
    }

    enableEdit() {
        this.createForm();
        this.viewData.inEditMode = true;
    }

    onFileChanged(event: any) {
        this.file = event.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_) => {
            this.imgURL = reader.result;
            this.dataa.imgUrl = event.target.files[0];
            console.log(this.imgURL);
            console.log(this.dataa.imgUrl);
        };
    }

    onSubmit(fieldValues: any) {
        let artItem = this.constructArtItemFromInputFields(fieldValues);
        console.log(artItem);
        artItem.lottery = this.data.lottery;
        this.artItemService.observeUpdateArtItem(artItem).subscribe();
    }

    private constructArtItemFromInputFields(item: any) {
        let artItemEntries = Object.entries(this.data).map((entry) => {
            let key = entry[0];
            let value = item[key] !== undefined && key !== 'id' ? item[key] : (this.data as any)[key];
            return [key, value];
        });
        return Object.fromEntries(artItemEntries) as ArtItem;
    }

    onUpload(artItem: ArtItem) {
        const formData: FormData = new FormData();
        formData.append('image', <File>this.file);
        formData.append('newImage', new Blob([this.file], { type: 'application/json' }));
        this.artItemService.setImage(artItem, formData).subscribe((resp) => resp);
    }

    private createForm() {
        this.fieldnames.forEach((field) => this.profileForm.addControl(field.key, this.fb.control(field.value)));
    }

    loadImageUrl() {
        this.imgURL = this.itemApiService.getArtItemImageUrl(this.data.id);
    }
}
