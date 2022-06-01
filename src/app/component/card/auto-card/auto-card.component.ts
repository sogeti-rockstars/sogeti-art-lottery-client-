import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
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
        console.log(this.profileForm);

        this.lotteryService.getLotteriesSummary().subscribe((lotts) => (this.lotteries = lotts));
    }

    onSubmit(object: ArtItem) {
        console.log(object);
        this.artItemService.observeUpdateArtItem(object).subscribe((data) => {
            console.log(data.id);
            this.matDialog.closeAll();
        });
    }
    ngOnInit(): void {
        this.editMode = false;
        this.objectValueExtraction();
        this.formCreation();
    }

    private formCreation() {
        for (let i = 0; i < this.objectContent.length; i++) {
            this.profileForm.addControl(this.variableNames[i], this.fb.control(this.values[i]));
        }
        this.profileForm.patchValue({ value: this.values[6] });
    }

    private objectValueExtraction() {
        this.objectContent = Object.entries(this.object);
        this.values = this.objectContent.map(function (value, index) {
            if (value[0].toLowerCase().indexOf('lottery') != -1) {
                if (typeof value[1] === 'object' && value[1] != null) {
                    return value[1].title;
                }
            }
            return value[1];
        });
        this.variableNames = this.objectContent.map(function (value, index) {
            return value[0];
        });
        for (let i = 0; i < this.variableNames.length; i++) {
            this.prettyVarNames[i] = this.variableNames[i].replace(/([A-Z])/g, ' $1');
            this.prettyVarNames[i] = this.prettyVarNames[i].charAt(0).toUpperCase() + this.prettyVarNames[i].slice(1);
        }
    }

    loadImageUrl() {
        return this.itemApiService.getArtItemImageUrl(this.object.id);
    }
}
