import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'thumbnail',
  styleUrls: ['./thumbnail.component.css'],
  template:
    '<img class="{{cssClass}}" src="http://localhost:8080/api/v1/item/image/{{id}}">',
})
export class ThumbnailComponent implements OnInit {
  @Input() id: number;
  @Input() cssClass: string;

  constructor() {
    this.id = 0;
    this.cssClass = 'thumbnailImg';
  }

  ngOnInit(): void {
    console.log(this);
  }
}

