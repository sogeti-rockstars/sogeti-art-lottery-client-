import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './component/material.module';

import { appRoutes } from './app.routing';
import { MenuItems } from './component/menu-items/menu-items';
import { ModalService } from './component/modal/modal.service';
import { LotteryStartComponent } from './pages/lottery-start/lottery-start.component';
import { CreateLotteryComponent } from './pages/create-lottery/create-lottery.component';

@NgModule({
    declarations: [AppComponent, LotteryStartComponent, CreateLotteryComponent],
    imports: [RouterModule.forRoot(appRoutes), CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, MaterialComponentsModule],
    providers: [
        MenuItems,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
