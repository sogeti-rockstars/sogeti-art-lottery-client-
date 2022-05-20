import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from 'src/app/component/menu-items/menu-items';
import { AppComponent } from 'src/app/app.component';
import { LotteryApiService } from 'src/app/service/api/lottery-api.service';
import { Lottery } from 'src/app/model/lottery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Output() lotteryEmit: EventEmitter<Lottery[]> = new EventEmitter();
  lotteries:Lottery[]=[];

  @Input() public visible = false;
  @Output() public visibility = new EventEmitter<boolean>();

  constructor(
    public app: AppComponent,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private lotteryService:LotteryApiService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.getMenuitem();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // this.menuItems.getMenuitem()[0].state;
    // this.menuItems.getMenuite
  }

  getMenuitem() {
    this.lotteryService.getLotteries().subscribe(
      (data:Lottery[]) => {this.lotteryEmit.emit(data);
        this.lotteries= data;
      }      
    );
    console.log("get menu item"+ this.lotteries)
}

  public toggleSideNav() {
    this.visible = !this.visible;
    this.visibility.emit(this.visible);

  }
}
