import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';
import { FancyImageCardComponent } from '../../card/fancy-image-card/fancy-image-card.component';


@Component({
  selector: 'app-materialmodal',
  templateUrl: './materialmodal.component.html',
  styleUrls: ['./materialmodal.component.css']
})
export class MaterialmodalComponent implements OnInit {
  @Input() artItem!: ArtItem;
  @Input() editItem: boolean = false;
  @Input() addItem: boolean = false;
  @Input() viewItem: boolean = false;

  constructor(public dialog: MatDialog) { }

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

}

@Component({
  selector: 'dialog-content-image',
  templateUrl: './materialmodalimage.component.html',
  styleUrls: ['./materialmodalimage.component.css']
})
export class DialogContentImage{

constructor(@Inject(MAT_DIALOG_DATA) public data: {
  label: string;
  artItem: ArtItem;
}, private itemApiService: ArtItemApiService, private itemService : ArtItemService){}

loadImageUrl(): string{
  return this.itemApiService.getArtItemImageUrl(this.data.artItem.id);
}

}

@Component({
  selector: 'dialog-content',
  templateUrl: './materialmodalcontent.component.html'
})
export class DialogContent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    label:string;
  }) {}

}