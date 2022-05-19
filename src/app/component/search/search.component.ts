<<<<<<< HEAD
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
=======
import { Component } from '@angular/core';
>>>>>>> dev

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchQuery: string = '';
  public searchForm!: FormGroup;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() {}

  ngOnInit(): void {}

  public search() {
    console.log(this.searchForm.get('query')!.value);
  }
}

function keyDownFunction(event: Event | undefined, any: any) {
    throw new Error('Function not implemented.');
  }