import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';
import { FancyImageCardComponent } from '../../card/fancy-image-card/fancy-image-card.component';
import { DialogContentImageComponent } from './dialog-content-image/dialog-content-image.component';
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
    @Input() artItem!: ArtItem;
    @Input() editItem: boolean = false;
    @Input() addItem: boolean = false;
    @Input() viewItem: boolean = false;

    constructor(public dialog: MatDialog, private artItemService: ArtItemService) {}

    openEditItemDialogImage(artItem: ArtItem) {
        let dialogRef = this.dialog.open(DialogContentImageComponent, {
            data: { label: 'label example', artItem: artItem },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`dialog result: ${result}`);
        });
    }

    openNewItemDialog() {
        let dialogRef = this.dialog.open(DialogContentComponent, {
            data: {
                label: 'New Item',
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`dialog result: ${result}`);
        });
    }

    openFancyItemCard(artItem: ArtItem) {
        let dialogRef = this.dialog.open(FancyImageCardComponent, {
            data: {
                artItem: artItem,
            },
            panelClass: 'custom-dialog-container',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`dialog result: ${result}`);
        });
    }

    closeDialogs() {
        this.dialog.closeAll;
    }
}
