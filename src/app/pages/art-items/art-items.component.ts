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
import { ArtItemApiService } from 'src/app/service/api/art-item-api.service';

@Component({
  selector: 'app-art-items',
  templateUrl: 'art-items.component.html',
  styleUrls: ['./art-items.component.css'],
})
export class ArtItemsComponent {
  // public artItems: ArtItem[] = [];
  allIsChecked = false;
  constructor(
    public app: AppComponent,
    private artItemService: ArtItemApiService
  ) {}

  public selectAll(): void {
    var allCheckboxes = document.getElementsByName('artItemCheckbox');
    var cbox;
    for (var i = 0; i < allCheckboxes.length; i++) {
      cbox = <any>allCheckboxes[i];
      cbox.checked = this.allIsChecked ? false : true;
    }
    this.allIsChecked = !this.allIsChecked ? true : false;
  }

  public removeSelectedArtItems() {
    if (confirm('Är du säker på att du vill radera?')) {
      var allCheckboxes = document.getElementsByName('artItemCheckbox');
      var cbox;
      var arrSelected = [];
      for (var i = 0; i < allCheckboxes.length; i++) {
        cbox = <any>allCheckboxes[i];
        cbox.checked
          ? this.artItemService.deleteArtItem(cbox.value).subscribe({
              complete: () => {
                this.app.loadPaintings();
              },
            })
          : void 0;
      }
    }
  }
}
