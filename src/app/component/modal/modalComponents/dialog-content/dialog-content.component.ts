import { Component, Output, EventEmitter, Inject, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
    selector: 'dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent implements OnInit {
    @Output() artItemOutput = new EventEmitter<ArtItem>();
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            component: ComponentRef<any>;
        },
        private vcr: ViewContainerRef
    ) {}
    ngOnInit(): void {
        console.log(this.data.component.instance);
        this.vcr.insert(this.data.component.hostView);
    }
}
