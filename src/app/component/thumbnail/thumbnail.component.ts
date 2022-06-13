import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { AppComponent } from 'src/app/app.component';
import { ArtItemFormComponent } from '../form/art-item-form/art-item-form.component';
import { ModalComponent } from '../modal/modalComponents/modal.component';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ModalService } from '../modal/modal.service';
import { AuthService } from 'src/app/service/auth.service';
import { WinnerApiService } from 'src/app/service/api/winner-api.service';
import { Winner } from 'src/app/model/winner';
import { WinnerService } from 'src/app/service/winner.service';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
    @Input() id!: number;
    @Input() cssClass: string;
    @Input() artItem!: ArtItem;
    @Input() winner!: Winner;

    loadModal(artItem: ArtItem) {
        console.log(artItem.itemName);
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }
    constructor(
        private modalService: ModalService,
        private viewContainerRef: ViewContainerRef,
        public authService: AuthService,
        private winnerService: WinnerService
    ) {
        this.cssClass = 'thumbnailImg';
    }
    addModal() {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModal(component, this.viewContainerRef);
    }
    saveWinnerArtItem(artItem: ArtItem) {
        this.winner.lotteryItem = artItem;
        console.log(this.winner);
        this.winnerService.updateWinner(this.winner).subscribe((resp) => {
            console.log(resp.lotteryItemId);
            console.log(resp);
        });
    }
}
