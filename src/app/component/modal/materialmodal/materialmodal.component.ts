import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { FancyImageCardComponent } from '../../card/fancy-image-card/fancy-image-card.component';
import { ModalDirective } from '../modal.directive';


@Component({
  selector: 'app-materialmodal',
  // templateUrl: './materialmodal.component.html',
  template: `<div class="modal">
  <ng-template modalHost></ng-template>
</div>`,
  styleUrls: ['./materialmodal.component.css']
})
export class MaterialmodalComponent implements OnInit {
  @Input() artItem!: ArtItem;
  @Input() editItem: boolean = false;
  @Input() addItem: boolean = false;
  @Input() viewItem: boolean = false;
  @ViewChild(ModalDirective, {static: true}) modalHost!: ModalDirective;

  constructor(public dialog: MatDialog, private artItemService: ArtItemService) { }

  ngOnInit(): void {

  }
  openDialogImage(artItem:ArtItem) {
    let dialogRef = this.dialog.open(DialogContentImage, {
      data: { label: 'label example', artItem: artItem },
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result: ${result}`)
    })
  }

  openNewItemDialog(){
    let dialogRef = this.dialog.open(DialogContent, {data: {
      label: 'New Item'
    }})
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result: ${result}`)
    });
  }

  openFancyItemCard(artItem:ArtItem){
    let dialogRef = this.dialog.open(FancyImageCardComponent, {data: {
      artItem: artItem
    }})
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result: ${result}`)
    });
  }

  closeDialogs(e:any){
    this.dialog.closeAll;
  }

}

@Component({
  selector: 'dialog-content-image',
  templateUrl: './materialmodalimage.component.html',
  styleUrls: ['./materialmodalimage.component.css']
})
export class DialogContentImage{
  @Output() artItemOutput = new EventEmitter<ArtItem>();

  output(artItem:ArtItem){
    console.log('diaconima'+artItem.itemName);
    this.saveUpdateItem(artItem);
  }

constructor(@Inject(MAT_DIALOG_DATA) public data: {
  label: string;
  artItem: ArtItem;
}, private itemApiService: ArtItemApiService, private artItemService : ArtItemService){}

loadImageUrl(): string{
  return this.itemApiService.getArtItemImageUrl(this.data.artItem.id);
}

saveUpdateItem(artItem:ArtItem){
  console.log('update is'+artItem.itemName);
this.artItemService.observeUpdateArtItem(artItem).subscribe(data => {
  console.log(data.id) });
  this.artItemOutput.emit(artItem);
}

}

@Component({
  selector: 'dialog-content',
  templateUrl: './materialmodalcontent.component.html'
})
export class DialogContent{
  @Output() artItemOutput = new EventEmitter<ArtItem>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    label:string;
  }, private artItemService: ArtItemService) {}

  output(artItem:ArtItem){
    console.log('diacon'+artItem.itemName);
    this.saveAddItem(artItem);
  }

  saveAddItem(artItem:ArtItem){
    console.log('add is'+artItem.itemName);
  this.artItemService.observeAddArtItem(artItem).subscribe(data => {
    console.log(data.id) });
    this.artItemOutput.emit(artItem);
}

}