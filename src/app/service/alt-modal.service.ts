import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContestantRowComponent } from '../component/contestant-row/contestant-row.component';

@Injectable({
    providedIn: 'root',
})
export class AltModalService {
    showModal(dialog: MatDialog, data: any, afterClosed: any): void {
        dialog!.open(ContestantRowComponent, { data: data }).afterClosed().subscribe(afterClosed);
    }
}
