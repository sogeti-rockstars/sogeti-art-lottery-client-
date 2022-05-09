import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
// import { ArtItemsListComponent } from './component/art-items-list/art-items-list.component';
// import { ArtItemsComponent } from './component/art-items/art-items.component';
// import { AssociationComponent } from './component/association/association.component';
// import { SearchComponent } from './component/search/search.component';
// import { ThumbnailComponent } from './component/thumbnail/thumbnail.component';
import { MaterialComponentsModule } from './component/material.module';
import { MenuItems } from './component/menu-items/menu-items';
// import { SpinnerComponent } from './layouts/pages/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    // SpinnerComponent,
    // ArtItemsComponent,
    // ThumbnailComponent,
    // SearchComponent,
    // AssociationComponent,
    // ArtItemsListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialComponentsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    MenuItems,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
