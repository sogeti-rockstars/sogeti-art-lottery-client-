import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfoComponent } from './component/modal/modal-info/modal-info.component';
import { ModalService } from './component/modal/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtItemFormComponent } from './component/form/art-item-form/art-item-form.component';
import { LotteryParticipantComponent } from './component/form/lottery-participant/lottery-participant.component';
import { ArtItemService } from './service/art-item.service';

@NgModule({
  declarations: [
    AppComponent, 
    ModalInfoComponent,
  ArtItemFormComponent,
  LotteryParticipantComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ModalService, ArtItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
