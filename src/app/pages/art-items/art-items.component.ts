import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ArtItemFormComponent } from 'src/app/component/form/art-item-form/art-item-form.component';
import { ModalService } from 'src/app/component/modal/modal.service';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-art-items',
    templateUrl: 'art-items.component.html',
    styleUrls: ['./art-items.component.css'],
})
export class ArtItemsComponent implements OnInit {
    @Input() public artItems: ArtItem[] = [];
    allIsChecked = false;
    private loadPaintingSubscription!: Subscription;
    constructor(
        public authService: AuthService,
        private artItemApiService: ArtItemApiService,
        private lotteryService: LotteryService,
        private modalService: ModalService,
        private vcr: ViewContainerRef
    ) {}
    ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined) this.loadPaintingsFromLottery(this.lotteryService.currLotteryId);
        this.loadPaintingSubscription = this.lotteryService.lotteryChanged.subscribe((lottery) => this.loadPaintingsFromLottery(lottery.id));
    }

    public loadAllItems() {
        this.artItemApiService.getArtItems().subscribe({
            complete: () => {
                console.log('Loading complete!');
            },
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
            complete: () => {
                console.log('Loading complete!');
            },
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
        console.log('newItem');
        const component = this.vcr.createComponent<ArtItemFormComponent>(ArtItemFormComponent);

        this.modalService.loadModal(component, this.vcr);
        console.log(component);
    }

    public removeSelectedArtItems() {
        if (confirm('Är du säker på att du vill radera?')) {
            var allCheckboxes = document.getElementsByName('artItemCheckbox');
            var cbox;
            var arrSelected = [];
            for (var i = 0; i < allCheckboxes.length; i++) {
                cbox = <any>allCheckboxes[i];
                cbox.checked
                    ? this.artItemApiService.deleteArtItem(cbox.value).subscribe({
                          complete: () => {
                              this.artItemApiService.getArtItems();
                          },
                      })
                    : void 0;
            }
        }
    }
}
