import { ChangeDetectorRef, Component, Inject, Input, OnInit, Optional } from '@angular/core';
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
    isModal?: boolean;
}

@Component({
    selector: 'art-item-details',
    templateUrl: './art-item-details.component.html',
    styleUrls: ['./art-item-details.component.css'],
})
export class ArtItemDetailsComponent implements OnInit {
    file?: Blob;
    imgURL: any;

    fieldnames: { key: string; value: string }[] = [];

    @Input() onClickOverride?: (artItemComp: ArtItemDetailsComponent, matDialog: MatDialog) => void;

    @Input() data!: ArtItem;
    @Input() viewData: ArtItemDetailsViewData = { inEditMode: false, isAdmin: false, isThumbnail: true, isModal: false };
    @Input() dataa!: { file: string; imgUrl: string };

    @Input() lotteries: Lottery[] = [];

    profileForm = this.fb.group(this.fb.control('edit-item'));

    constructor(
        private fb: FormBuilder,
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService,
        private matDialog: MatDialog,
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        data?: { item?: ArtItem; viewData?: ArtItemDetailsViewData }
    ) {
        if (data?.item !== undefined) this.data = data.item;
        if (data?.viewData !== undefined) this.viewData = data.viewData;
    }

    ngOnInit(): void {
        Object.entries(this.data).forEach((entr) => {
            this.fieldnames.push({ key: entr[0], value: entr[1] as string });
        });
        this.loadImageUrl();
    }

    onClick() {
        if (this.onClickOverride != undefined) this.onClickOverride(this, this.matDialog);
        else if (!this.viewData.isModal) {
            let nViewData = Object.create(this.viewData);
            nViewData.isModal = true;
            this.matDialog.open(ArtItemDetailsComponent, { data: { item: this.data, viewData: nViewData }, panelClass: 'art-item-details-card' });
        } else {
            this.matDialog.closeAll();
        }
    }

    enableEdit() {
        this.createForm();
        this.viewData.inEditMode = true;
    }

    onFileChanged(event: any) {
        this.file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.file!);
        reader.onload = (_pEv) => {
            console.log(reader.result);
            this.imgURL = reader.result;
        };
    }

    onSubmit(fieldValues: any) {
        let artItem = this.constructArtItemFromInputFields(fieldValues);
        artItem.lottery = this.data.lottery;
        this.artItemService.observeUpdateArtItem(artItem).subscribe();
        this.uploadIfNeeded(artItem);
    }

    private constructArtItemFromInputFields(item: any) {
        let artItemEntries = Object.entries(this.data).map((entry) => {
            let key = entry[0];
            let value = item[key] !== undefined && key !== 'id' ? item[key] : (this.data as any)[key];
            return [key, value];
        });
        return Object.fromEntries(artItemEntries) as ArtItem;
    }

    private uploadIfNeeded(artItem: ArtItem) {
        if (this.file !== undefined) {
            let formData = new FormData();
            formData.append('image', new Blob([this.file], { type: 'application/json' }));
            this.artItemService.setImage(artItem, formData).subscribe((_) => {
                console.log('Upload complete!');
                this.file = undefined;
            });
        }
    }

    private createForm() {
        this.fieldnames.forEach((field) => this.profileForm.addControl(field.key, this.fb.control(field.value)));
    }

    private loadImageUrl() {
        this.imgURL = this.itemApiService.getArtItemImageUrl(this.data.id);
    }
}
