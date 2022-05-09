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
import { ArtItemService } from './service/art-item.service';
import { CardInfoComponent } from './component/card/card-info/card-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContent, DialogContentImage, MaterialmodalComponent } from './component/modal/materialmodal/materialmodal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MaterialArtItemFormComponent } from './component/form/material-art-item-form/material-art-item-form.component';

@NgModule({
  declarations: [
    AppComponent, 
    ModalInfoComponent,
  ArtItemFormComponent,
  CardInfoComponent,
  MaterialmodalComponent,
  DialogContentImage,
  MaterialArtItemFormComponent,
  DialogContent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ModalService, ArtItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
