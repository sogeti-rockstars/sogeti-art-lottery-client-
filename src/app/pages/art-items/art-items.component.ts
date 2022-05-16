import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';

@Component({
  selector: 'app-art-items',
  templateUrl: 'art-items.component.html',
  styleUrls: ['./art-items.component.css'],
})
export class ArtItemsComponent {
  // public artItems: ArtItem[] = [];
  allIsChecked = false;
  constructor(public app: AppComponent) {}

  public selectAll() : void {
    var allCheckboxes = document.getElementsByName("artItemCheckbox");
    var cbox;
    for(var i=0; i<allCheckboxes.length; i++) {
      cbox = <any> allCheckboxes[i];
      cbox.checked = this.allIsChecked ? false : true;
    }
    this.allIsChecked = !this.allIsChecked ? true : false;
  }

  public removeSelectedArtItems() {
    if(confirm("Are you sure to delete ")) {
      var allCheckboxes = document.getElementsByName("artItemCheckbox");
    var cbox;
    var arrSelected = [];
    for(var i=0; i<allCheckboxes.length; i++) {
      cbox = <any> allCheckboxes[i];
      cbox.checked ? arrSelected.push(cbox.id) : void(0);
    }
      console.log(arrSelected);
    }
  }

}






