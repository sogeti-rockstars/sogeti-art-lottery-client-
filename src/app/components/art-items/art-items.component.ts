import { Component, OnInit } from '@angular/core';
import { AppComponent  } from 'src/app/app.component';
import { ArtItem } from 'src/app/model/art-item';

@Component({
  selector: 'app-art-items',
  templateUrl: 'art-items.component.html',
  styleUrls: ['./art-items.component.css']
})
export class ArtItemsComponent implements OnInit {
  public artItems: ArtItem[] = [];
  constructor(private app: AppComponent) { }

  ngOnInit(): void {
    this.artItems = this.app.paintings;
  }
}
