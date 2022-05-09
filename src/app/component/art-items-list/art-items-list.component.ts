import { AfterContentChecked, Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';

@Component({
  selector: 'art-items-list',
  templateUrl: './art-items-list.component.html',
  styleUrls: ['./art-items-list.component.css'],
})
export class ArtItemsListComponent implements AfterContentChecked {
  public artItems: ArtItem[] = [];
  constructor(private app: AppComponent) {}

  ngOnInit(): void {
    // this.artItems = this.app.paintings;
    this.artItems = this.app.paintings;
  }

  ngAfterContentChecked(): void {
    this.artItems = this.app.paintings;
  }
}
