import { HttpErrorResponse } from "@angular/common/http";
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ArtItem } from "src/app/model/art-item";
import { ArtItemApiService } from "src/app/service/api/art-item-api.service";
import { ArtItemService } from "src/app/service/art-item.service";

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
  @Input() modalHeader!: string;
  @Input() modalBody!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() artItem!: ArtItem;
  @Output() saveSuccessful: EventEmitter<ArtItem> = new EventEmitter<ArtItem>();
  paintings: ArtItem[]=[];
  artItemOutput!: ArtItem;
  imageView!:boolean;
  editView!:boolean;
  newItem!:boolean;
  private rootViewContainer!: ViewContainerRef;
  constructor(private factoryResolver: ComponentFactoryResolver, private itemApiService: ArtItemApiService, private itemService : ArtItemService) {
    this.factoryResolver = factoryResolver;
}
    //TODO: Hur refresha loadPaintings() i appComponent när den har sparat något?
  saveModal(artItemOutput:ArtItem){
    if(this.newItem==true){
    this.itemApiService.addArtItem(artItemOutput).subscribe(data => {
    console.log(data.id+'ID new item') });
  }
    if(this.newItem==false){
      this.itemService.saveArtItem(artItemOutput).subscribe(data => {
        console.log(data.id+'ID updated item');
      })
    }
  }

  ngOnInit(): void {

  }
  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
}

  close(event: any){
    this.closeModal.emit(event);
  }

  loadImageUrl(): string{
    return this.itemApiService.getArtItemImageUrl(this.artItem.id);
  }

  public loadPaintings(): void {
    this.itemApiService.getArtItems().subscribe({
      complete: () => {
        console.log('Loading complete!aaaa');
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      next: (resp: ArtItem[]) => {
        this.paintings = resp;
      },
    });
  }

}
