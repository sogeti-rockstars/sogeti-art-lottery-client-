// import { ArtItemsListComponent } from './component/art-items-list/art-items-list.component';
// import { ArtItemsComponent } from './component/art-items/art-items.component';
// import { AssociationComponent } from './component/association/association.component';
// import { SearchComponent } from './component/search/search.component';
// import { ThumbnailComponent } from './component/thumbnail/thumbnail.component';
// import { SpinnerComponent } from './layouts/pages/spinner/spinner.component';

// import { FlexLayoutModule } from '@angular/flex-layout';
// import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
// import { ModalInfoComponent } from './component/modal/modal-info/modal-info.component';
// import { ModalService } from './component/modal/modal.service';
// import { ArtItemFormComponent } from './component/form/art-item-form/art-item-form.component';
import { ArtItemService } from './service/art-item.service';
// import { CardInfoComponent } from './component/card/card-info/card-info.component';
import { appRoutes } from './app.routing';
import { MaterialComponentsModule } from './component/material.module';
import { MenuItems } from './component/menu-items/menu-items';
import { ContestantsComponent } from './pages/contestants/contestants.component';

import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { ArtItemsComponent } from './pages/art-items/art-items.component';
import { ThumbnailComponent } from './component/thumbnail/thumbnail.component';
import { SearchComponent } from './component/search/search.component';
import { AssociationComponent } from './pages/association/association.component';
import { ArtItemsListComponent } from './component/art-items-list/art-items-list.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { MaterialArtItemFormComponent } from './component/form/material-art-item-form/material-art-item-form.component';
import { FancyImageCardComponent } from './component/card/fancy-image-card/fancy-image-card.component';
import { DialogContent, DialogContentImage, MaterialmodalComponent } from './component/modal/materialmodal/materialmodal.component';
import { ModalDirective } from './component/modal/modal.directive';
import { ContestantRowComponent } from './component/contestant-row/contestant-row.component';
import { MatCommonModule, MatLineModule, MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ContestantsComponent,
    SpinnerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    ArtItemsComponent,
    ThumbnailComponent,
    SearchComponent,
    AssociationComponent,
    ArtItemsListComponent,
    WinnersComponent,
    MaterialArtItemFormComponent,
    FancyImageCardComponent,
    MaterialmodalComponent,
    DialogContentImage,
    DialogContent,
    ModalDirective,
    ContestantRowComponent,

    // ModalInfoComponent,
    // ArtItemFormComponent,
    // CardInfoComponent,
    // SpinnerComponent,
    // ArtItemsComponent,
    // ThumbnailComponent,
    // SearchComponent,
    // AssociationComponent,
    // ArtItemsListComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MaterialComponentsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatFormFieldModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatInputModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatCommonModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatLineModule,
  ],
  exports: [
    MaterialComponentsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatFormFieldModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatInputModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatCommonModule,
    MatListModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatLineModule,
  ],
  providers: [
    MenuItems,
    ArtItemService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
