import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Lottery } from 'src/app/model/lottery';
import { LotteryApiService } from 'src/app/service/api/lottery-api.service';


@Injectable()
export class MenuItems {
  lotteries:Lottery[]=[];

  constructor(private lotteryService:LotteryApiService){

  }
  getMenuitem():Lottery[] {
      this.lotteryService.getLotteries().subscribe(
        (data:Lottery[]) => {this.lotteries=data}      
      );
      return this.lotteries;
  }
}