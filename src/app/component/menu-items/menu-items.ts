import { EventEmitter, Injectable, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Lottery } from 'src/app/model/lottery';
import { LotteryApiService } from 'src/app/service/api/lottery-api.service';


@Injectable()
export class MenuItems {
  @Output() lotteries: EventEmitter<Lottery[]> = new EventEmitter();

  constructor(private lotteryService:LotteryApiService){

  }
  getMenuitem() {
      this.lotteryService.getLotteries().subscribe(
        (data:Lottery[]) => {this.lotteries.emit(data)
        }      
      );
  }
}