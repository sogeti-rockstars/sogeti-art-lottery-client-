import { ChangeDetectorRef, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { LotteryService } from 'src/app/service/lottery.service';

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

    @Input() data!: ArtItem;
    @Input() viewData: ArtItemDetailsViewData = { inEditMode: false, isAdmin: false, isThumbnail: true, isModal: false };
    @Input() dataa!: { file: string; imgUrl: string };

    @Input() lotteryId!: number;

    profileForm = this.fb.group(this.fb.control('edit-item'));

    constructor(
        private fb: FormBuilder,
        private itemApiService: ArtItemApiService,
        private artItemService: ArtItemService,
        private lotteryService: LotteryService,
        private cdr: ChangeDetectorRef,
        @Optional()
        @Inject(MAT_DIALOG_DATA)
        data?: { item?: ArtItem; viewData?: ArtItemDetailsViewData }
    ) {
        if (data?.item !== undefined) this.data = data.item;
        if (data?.viewData !== undefined) this.viewData = data.viewData;
    }
    ngOnInit(): void {
        this.populateFields();
        this.loadImageUrl();
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
            this.imgURL = reader.result;
        };
    }

    onSubmit(fieldValues: any) {
        let artItem = this.constructArtItemFromInputFields(fieldValues);

        this.lotteryService.setGuaranteePrize(this.lotteryId, artItem).subscribe((_) => {
            // this.data = artItem;
            this.lotteryService.getGuaranteePrize(this.lotteryId).subscribe((r) => {
                this.data = r;
                this.uploadIfNeeded(r);
                this.populateFields();
            });
        });
        this.viewData.inEditMode = false;
        this.cdr.detectChanges();
    }

    readonly fieldGuiNames = new Map<string, string>([
        ['id', 'ID'],
        ['itemName', 'Titel'],
        ['artistName', 'Konstnär'],
        ['size', 'Storlek'],
        ['frameDescription', 'Rambeskrivning'],
        ['itemValue', 'Värde'],
        ['technique', 'Teknik'],
        ['available', ''],
    ]);

    private populateFields() {
        this.fieldnames = [];
        Object.entries(this.data).forEach((entr) => {
            if (entr[0] !== 'id' && entr[0] !== 'available') this.fieldnames.push({ key: entr[0], value: entr[1] as string });
        });
    }
    private constructArtItemFromInputFields(item: any) {
        let artItemEntries: [string, any][] = Object.entries(this.data).map((entry) => {
            let key = entry[0];
            let value = item[key];
            return [key, value];
        });
        artItemEntries.push(['id', this.data.id!]);
        return Object.fromEntries(artItemEntries) as ArtItem;
    }

    private uploadIfNeeded(artItem: ArtItem) {
        if (this.file !== undefined) {
            let formData = new FormData();
            formData.append('image', new Blob([this.file], { type: 'application/json' }));
            this.artItemService.setImage(artItem, formData).subscribe((_) => {
                this.file = undefined;
            });
        }
    }

    private createForm() {
        this.fieldnames.forEach((field) => this.profileForm.addControl(field.key, this.fb.control(field.value)));
    }

    private loadImageUrl() {
        if (this.data.id !== undefined) this.imgURL = this.itemApiService.getArtItemImageUrl(this.data.id!);
    }
}
