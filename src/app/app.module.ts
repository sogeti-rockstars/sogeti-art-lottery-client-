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

import { CommonModule, LocationStrategy, PathLocationStrategy, } from '@angular/common';
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


@NgModule({
    declarations: [
        AppComponent,
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
        BrowserModule,
        CommonModule,
        HttpClientModule,
        MaterialComponentsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        // NgbModule,
        // ReactiveFormsModule
        // FormsModule,
        // FlexLayoutModule,
    ],
    providers: [
        MenuItems,
        // ModalService,
        ArtItemService,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
