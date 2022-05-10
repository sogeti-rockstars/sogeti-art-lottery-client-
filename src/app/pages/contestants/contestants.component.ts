import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Contestant } from 'src/app/model/contestant';
import { ContestantService } from 'src/app/service/contestant.service';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent implements OnInit {
  public allContestants!: Contestant[];
  public filteredContestants!: Contestant[];

  public contestantData!: [Contestant, boolean][];

  public searchQuery: string = '';
  public searchForm!: FormGroup;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private service: ContestantService) {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.minLength(2)),
    });
  }

  ngOnInit(): void {
    this.loadContestants();
  }

  private loadContestants(): void {
    this.service.getContestants().subscribe({
      next: (resp) => {
        this.allContestants = resp;
        this.filteredContestants = this.allContestants;
        this.contestantData = new Array(this.allContestants.length);
        this.allContestants.map((c, i) => (this.contestantData[i] = [c, true]));
      },
    });
  }

  public search() {
    console.log(this.searchForm.get('query')!.value);
  }

  keyDownFunction(event: any) {
    this.searchQuery = this.searchForm.get('query')!.value;
    this.contestantData.map((c) => {
      c[1] = c[0].name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
    console.log(event);
    // this.filteredContestants = this.allContestants.slice().filter((c) => {
    //   this.searchQuery.includes(c.name);
    // });
    // if (event.code === 'Enter') {
    //   this.search();
    // }
  }
}

// constructor(private service: ContestantService, private fb: FormBuilder) {
// @Input('label') label: string = 'Search';
// @Input('placeholder') placeHolder: string = 'Search';
// @Input('hint') hint: string = 'Enter text to search';
// searchText: string = '';
// errorMessage: string = '';
// searchEmitted: string = '';
// searchLabel: string = 'search';
// searchSub!: Subscription;
// ngOnDestroy() {
//   this.searchSub.unsubscribe();
// }
//
// public search() {
//   console.log(this.searchForm.get('query')!.value);
//   if (this.searchEmitted !== this.searchText) {
//     this.errorMessage = '';
//     this.searchEmitted = this.searchText;
//     this.onSearch.emit(this.searchText);
//   }
// }
//
// public invalid(message: string) {
//   this.errorMessage = message;
// }
