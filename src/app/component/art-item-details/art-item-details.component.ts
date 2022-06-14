import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';

interface ArtItemDetailsViewData {
    inEditMode?: boolean;
    isAdmin?: boolean;
}

@Component({
    selector: 'art-item-details',
    templateUrl: './art-item-details.component.html',
    styleUrls: ['./art-item-details.component.css'],
})
export class ArtItemDetailsComponent implements OnInit {
    file: any;
    imgURL: any;

    prettyVarNames: string[] = [];
    values: string[] = [];

    @Input() onClickOverride?: (artItemComp: ArtItemDetailsComponent) => void;

    @Input() data!: ArtItem;
    @Input() viewData: ArtItemDetailsViewData = { inEditMode: false, isAdmin: false };
    @Input() dataa!: { file: string; imgUrl: string };

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
        console.log(this.viewData.isAdmin);
        console.log(this.viewData.inEditMode);

        // let entries = Object.entries(this.viewData).map(entr=>{
        //     if ( entr[1] == undefined )
        //         entr[1]
        // });

        // this.editMode = false;
        this.loadImageUrl();
        // this.objectValueExtraction();
        // this.formCreation();
        // this.lotteryService.getLotteriesSummary().subscribe((resp) => (this.lotteries = resp));
    }

    onClick() {
        console.log('image clicked!');
        if (this.onClickOverride != undefined) this.onClickOverride(this);
        else this.openModal();
    }

    openModal() {}

    enableEdit() {
        this.viewData.inEditMode = true;

        // if (this.lotteryService.currLotteryId !== undefined)
        //     this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => ());
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

    onSubmit(item: ArtItem) {
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

    // private formCreation() {
    //     for (let i = 0; i < this.objectContent.length; i++) {
    //         this.profileForm.addControl(this.variableNames[i], this.fb.control(this.values[i]));
    //     }
    //     this.profileForm.patchValue({ value: this.values[6] });
    // }

    loadImageUrl() {
        this.imgURL = this.itemApiService.getArtItemImageUrl(this.data.id);
    }
}
