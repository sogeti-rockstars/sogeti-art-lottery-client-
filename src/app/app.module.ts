import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfoComponent } from './component/modal/modal-info/modal-info.component';
import { ModalService } from './component/modal/modal.service';
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
import { FancyImageCardComponent } from './component/card/fancy-image-card/fancy-image-card.component';
import { MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent, 
    ModalInfoComponent,
  ArtItemFormComponent,
  CardInfoComponent,
  MaterialmodalComponent,
  DialogContentImage,
  MaterialArtItemFormComponent,
  DialogContent,
  FancyImageCardComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [ModalService, ArtItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
