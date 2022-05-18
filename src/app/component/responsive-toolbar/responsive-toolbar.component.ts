import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {

  constructor(public app: AppComponent) {}

  ngOnInit(): void {
  }

}
