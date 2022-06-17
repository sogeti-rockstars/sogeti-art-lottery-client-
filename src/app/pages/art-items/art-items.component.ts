import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtItemFormComponent } from 'src/app/component/form/art-item-form/art-item-form.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-art-items',
    templateUrl: 'art-items.component.html',
    styleUrls: ['./art-items.component.css'],
})
export class ArtItemsComponent implements OnInit, OnDestroy {
    @Input() public artItems: ArtItem[] = [];

    private lotteryChanged!: Subscription;
    private allIsChecked = false;

    constructor(
        public authService: AuthService,
        private artItemService: ArtItemService,
        private lotteryService: LotteryService,
        private modalService: ModalService,
        private vcr: ViewContainerRef
    ) {}
    ngOnDestroy(): void {
        this.lotteryChanged.unsubscribe();
    }
    ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined) this.loadPaintingsFromLottery(this.lotteryService.currLotteryId);
        this.lotteryChanged = this.lotteryService.lotteryChanged.subscribe((lottery) => this.loadPaintingsFromLottery(lottery.id));
        this.artItemService.artItemSubject$.subscribe(() => {
            if (this.lotteryService.currLotteryId !== undefined) this.loadPaintingsFromLottery(this.lotteryService.currLotteryId);
            else this.loadAllItems;
        });
    }

    public loadAllItems() {
        this.artItemService.getArtItems().subscribe({
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            },
            next: (resp: ArtItem[]) => {
                this.artItems = resp;
            },
        });
    }

    public loadPaintingsFromLottery(lotteryId: number): void {
        this.lotteryService.getArtItemsByLotteryId(lotteryId).subscribe({
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            },
            next: (resp: ArtItem[]) => {
                this.artItems = resp;
            },
        });
    }

    public selectAll(): void {
        var allCheckboxes = document.getElementsByName('artItemCheckbox');
        var cbox;
        for (var i = 0; i < allCheckboxes.length; i++) {
            cbox = <any>allCheckboxes[i];
            cbox.checked = this.allIsChecked ? false : true;
        }
        this.allIsChecked = !this.allIsChecked ? true : false;
    }

    public newItem() {
        const component = this.vcr.createComponent<ArtItemFormComponent>(ArtItemFormComponent);
        this.modalService.loadModalWithPanelClass(component, 'modal-new-item', this.vcr);
    }

    public removeSelectedArtItems() {
        if (confirm('Är du säker på att du vill radera?')) {
            var allCheckboxes = document.getElementsByName('artItemCheckbox');
            var cbox;
            for (var i = 0; i < allCheckboxes.length; i++) {
                cbox = <any>allCheckboxes[i];
                if (cbox.checked)
                    this.artItemService.deleteArtItem(cbox.value).subscribe({
                        complete: () => {
                            this.artItemService.getArtItems();
                        },
                    });
            }
        }
    }
}
