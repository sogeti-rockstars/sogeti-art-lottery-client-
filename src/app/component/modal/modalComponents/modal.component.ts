import { Component, ComponentRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    constructor(public dialog: MatDialog) {}

    closeDialogs() {
        this.dialog.closeAll;
    }

    openDefaultModal(component: ComponentRef<any>, panelClass: string): MatDialogRef<DialogContentComponent, any> {
        return this.dialog.open(DialogContentComponent, {
            data: { component: component },
            panelClass: panelClass,
        });
    }
}
