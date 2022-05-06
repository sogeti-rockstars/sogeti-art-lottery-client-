import { Component, EventEmitter, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
  selector: 'app-art-item-form',
  templateUrl: './art-item-form.component.html',
  styleUrls: ['./art-item-form.component.css']
})
export class ArtItemFormComponent implements OnInit{
  @Input() artItem!: ArtItem;
  @Output() artItemOutput = new EventEmitter<ArtItem>();
  update:boolean=false;

  profileForm = this.fb.group({
    id: [''],
    lotteryId: [''],
    itemName: ['', Validators.required],
    pictureUrl: [''],
    artistName: [''],
    size: [''],
    frameDescription: [''],
    value: [''],
    technique: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });
  rootViewContainer!: ViewContainerRef;

  get aliases(){
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, public viewContainerRef: ViewContainerRef, private artItemService: ArtItemService) { }

  ngOnInit(): void {
    if(this.artItem.id!=null){
      this.updateForm();
      this.update=true;
      console.log('artitem is not null')
    }
  }

  updateForm(){
      this.profileForm.patchValue({
        id: this.artItem.id,
        lotteryId: this.artItem.lotteryId,
        itemName: this.artItem.itemName,
    artistName: this.artItem.artistName,
    size: this.artItem.size,
    frameDescription: this.artItem.frameDescription,
    value: this.artItem.value,
    technique: this.artItem.technique
      });
      console.log(this.artItem.itemName+'updateForm');
  }

  addAlias(){
    this.aliases.push(this.fb.control(''));
  }

  onSubmit(artItem: ArtItem){
    if(this.update==false){
    //   console.log('update is'+this.update);
    // this.artItemService.addArtItem(artItem).subscribe(data => {
    //   console.log(data.id) });
    this.artItemOutput.emit(artItem);
    }
    if(this.update==true){
      // console.log('update is'+this.update);
      // this.artItemService.saveArtItem(artItem).subscribe(data => {
      //   console.log(data.id) });
        this.artItemOutput.emit(artItem);
    }
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
}


}
