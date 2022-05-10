import { Component, Input, OnInit } from '@angular/core';
import { Contestant } from 'src/app/model/contestant';

@Component({
  selector: 'app-contestant-row',
  templateUrl: './contestant-row.component.html',
  styleUrls: ['./contestant-row.component.css'],
})
export class ContestantRowComponent implements OnInit {
  @Input() data!: Contestant;

  constructor() {}

  ngOnInit(): void {}
}
