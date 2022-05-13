import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    //   template: `<div class="modal">
    //   <ng-template modalHost></ng-template>
    // </div>`,
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    @Output() artItemOutput!: ArtItem;
    // @Input() artItem!: ArtItem;

    constructor(public dialog: MatDialog, private artItemService: ArtItemService) {}

    closeDialogs() {
        this.dialog.closeAll;
    }
}
