import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArtItem } from 'src/app/model/art-item';
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';
import { ArtItemService } from 'src/app/service/art-item.service';

@Component({
  selector: 'app-material-art-item-form',
  templateUrl: './material-art-item-form.component.html',
  styleUrls: ['./material-art-item-form.component.css']
})
export class MaterialArtItemFormComponent implements OnInit {
  @Input() label!:string;
  @Input() inputPlaceholder!:string;
  @Input() artItem!:ArtItem;
  update: boolean = false;
  profileForm = this.fb.group({
    id: [''],
    lotteryId: [''],
    itemName: ['', Validators.required],
    pictureUrl: [''],
    artistName: [''],
    size: [''],
    frameDescription: [''],
    value: [''],
    technique: ['']
  });
  constructor(private fb: FormBuilder, private artItemService:ArtItemService) { }

  onSubmit(artItem: ArtItem){
    if(this.update==false){
      console.log('update is'+this.update);
    this.artItemService.observeUpdateArtItem(artItem).subscribe(data => {
      console.log(data.id) });
    // this.artItemOutput.emit(artItem);
    }
    if(this.update==true){
      console.log('update is'+this.update);
      this.artItemService.observeAddArtItem(artItem).subscribe(data => {
        console.log(data.id) });
        // this.artItemOutput.emit(artItem);
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



  ngOnInit(): void {
    if(this.artItem.id!=null){
      this.updateForm();
      this.update=true;
      console.log('artitem is not null')
    }
  }

}
