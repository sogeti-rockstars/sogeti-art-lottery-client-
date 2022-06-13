import { Component, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtItem } from 'src/app/model/art-item';
import { Winner } from 'src/app/model/winner';
import { AuthService } from 'src/app/service/auth.service';
import { WinnerService } from 'src/app/service/winner.service';
import { AutoCardComponent } from '../card/auto-card/auto-card.component';
import { ArtItemFormComponent } from '../form/art-item-form/art-item-form.component';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'thumbnail',
    styleUrls: ['./thumbnail.component.css'],
    templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent implements OnDestroy {
    @Input() id!: number;
    @Input() cssClass: string;
    @Input() artItem!: ArtItem;
    @Input() winner!: Winner;

    private winnerSubscription = new Subscription();

    constructor(
        private modalService: ModalService,
        private viewContainerRef: ViewContainerRef,
        public authService: AuthService,
        private winnerService: WinnerService
    ) {
        this.cssClass = 'thumbnailImg';
    }

    ngOnDestroy(): void {
        this.winnerSubscription.unsubscribe();
    }

    loadModal(artItem: ArtItem) {
        console.log(artItem.itemName);
        const component = this.viewContainerRef.createComponent<AutoCardComponent>(AutoCardComponent);
        this.modalService.loadModalWithObject(component, artItem, this.viewContainerRef);
    }

    addModal() {
        const component = this.viewContainerRef.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModal(component, this.viewContainerRef);
    }

    saveWinnerArtItem(artItem: ArtItem) {
        this.winner.lotteryItem = artItem;
        console.log(this.winner);
        this.winnerSubscription = this.winnerService.updateWinner(this.winner).subscribe((resp) => {
            console.log(resp.lotteryItemId);
            console.log(resp);
        });
    }
}
