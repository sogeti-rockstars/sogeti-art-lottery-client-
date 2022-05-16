import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';

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
    // profileForm = this.fb.group({ aliases: this.fb.array([this.fb.control('')]) });
    profileForm = this.fb.group(this.fb.control(''));

    constructor(private fb: FormBuilder, private itemApiService: ArtItemApiService, private artItemService: ArtItemService, private matDialog: MatDialog) {
        this.panelClass = 'custom-dialog-container';
    }

    enableEdit() {
        this.editMode = true;
        console.log(this.profileForm);
    }

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias(value: string) {
        this.aliases.push(this.fb.control(value));
    }

    onSubmit(object: any) {
        console.log(object);
        this.artItemService.observeUpdateArtItem(object).subscribe((data) => {
            console.log(data.id);
            this.matDialog.closeAll();
        });
    }
    ngOnInit(): void {
        this.editMode = false;
        console.log(typeof this.object);
        this.objectContent = Object.entries(this.object);

        this.values = this.objectContent.map(function (value, index) {
            return value[1];
        });
        this.variableNames = this.objectContent.map(function (value, index) {
            return value[0];
        });
        for (let i = 0; i < this.objectContent.length; i++) {
            this.profileForm.addControl(this.variableNames[i], this.fb.control(this.values[i]));
        }
        for (let i = 0; i < this.variableNames.length; i++) {
            this.prettyVarNames[i] = this.variableNames[i].replace(/([A-Z])/g, ' $1');
            this.prettyVarNames[i] = this.prettyVarNames[i].charAt(0).toUpperCase() + this.prettyVarNames[i].slice(1);
        }
        console.log(this.values);
        console.log(this.variableNames);
        console.log(this.prettyVarNames);
    }

    loadImageUrl() {
        return this.itemApiService.getArtItemImageUrl(this.object.id);
    }
}
