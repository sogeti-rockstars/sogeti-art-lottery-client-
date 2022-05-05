import { Component, Input, OnInit } from '@angular/core';
import { ArtItem } from 'src/app/model/art-item';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {
  @Input() artItem!:ArtItem;

  constructor() { }

  ngOnInit(): void {
  }

}
