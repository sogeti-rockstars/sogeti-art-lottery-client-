import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './component/material.module';

import { appRoutes } from './app.routing';
import { LotteryService } from './service/lottery.service';

@NgModule({
    declarations: [AppComponent],
    imports: [RouterModule.forRoot(appRoutes), CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, MaterialComponentsModule],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        LotteryService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
