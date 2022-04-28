import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfoComponent } from './component/modal/modal-info/modal-info.component';
import { ModalService } from './component/modal/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent, 
    ModalInfoComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ModalService],
})
export class AppModule {}
