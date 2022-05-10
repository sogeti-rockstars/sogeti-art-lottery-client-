import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';

@Component({
  selector: 'app-art-items',
  templateUrl: 'art-items.component.html',
  styleUrls: ['./art-items.component.css'],
})
export class ArtItemsComponent {
  // public artItems: ArtItem[] = [];
  constructor() {}
}
