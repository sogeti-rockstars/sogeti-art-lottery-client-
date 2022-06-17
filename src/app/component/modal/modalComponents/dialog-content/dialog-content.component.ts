import { Component, ComponentRef, EventEmitter, Inject, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';

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
        this.vcr.insert(this.data.component.hostView);
    }
}
