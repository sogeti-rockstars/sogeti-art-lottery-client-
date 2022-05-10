import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }
    
  onShow() {
    alert('Show button clicked!');
  }
  }

