import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialRoutes } from './material.routing';

import { MatPseudoCheckboxModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ArtItemsListComponent } from './art-items-list/art-items-list.component';
import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { AssociationComponent } from '../pages/association/association.component';
import { SearchComponent } from './search/search.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { AppSidebarComponent } from '../layouts/full/sidebar/sidebar.component';
import { AppHeaderComponent } from '../layouts/full/header/header.component';
import { FullComponent } from '../layouts/full/full.component';
import { WinnersComponent } from '../pages/winners/winners.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatLineModule, MatNativeDateModule, MatOptionModule } from '@angular/material/core';

import { FilterListComponent } from './filter-list/filter-list.component';
import { SpinnerComponent } from '../layouts/spinner/spinner.component';
import { DialogContentImageComponent } from './modal/modalComponents/dialog-content-image/dialog-content-image.component';
import { DialogContentComponent } from './modal/modalComponents/dialog-content/dialog-content.component';
import { ModalComponent } from './modal/modalComponents/modal.component';
import { ModalService } from './modal/modal.service';
import { AltModalService } from '../service/alt-modal.service';
import { AutoCardComponent } from './card/auto-card/auto-card.component';
import { ArtItemFormComponent } from './form/art-item-form/art-item-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { LotteryFormComponent } from './form/lottery-form/lottery-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContestantSelButtonsComponent } from './contestant-sel-buttons/contestant-sel-buttons.component';
import { ContestantRowComponent } from './contestant-row/contestant-row.component';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { MembersComponent } from '../pages/members/members.component';
import { CreateLotteryComponent } from '../pages/create-lottery/create-lottery.component';
import { LotteryStartComponent } from '../pages/lottery-start/lottery-start.component';
import { SpinningWheelComponent } from './spinning-wheel/spinning-wheel.component';
import { EditLotteryComponent } from '../pages/edit-lottery/edit-lottery.component';
import { LoginComponent } from '../pages/login/login.component';
import { FlowComponent } from '../pages/flow/flow.component';
import { AboutComponent } from '../pages/info/about.component';
import { ArtItemDetailsComponent } from './art-item-details/art-item-details.component';
import { ArtItemSecondComponent } from '../pages/art-item-second/art-item-second.component';

// import { CdkTableModule } from '@angular/cdk/table';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatNativeDateModule, MatOptionModule, MatRippleModule, } from '@angular/material/core';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const modules: Array<any> = [
    CommonModule,
    ReactiveFormsModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatFormFieldModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatInputModule, // ReactiveFormsModule, MatFormFieldModule & MatInputModule are needed for forms
    MatOptionModule,
    MatSelectModule,
    MatCommonModule,
    MatLineModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    MatTableModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatPseudoCheckboxModule,
];

const components: Array<any> = [
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
    ModalComponent,
    DialogContentImageComponent,
    DialogContentComponent,
    AutoCardComponent,
    ArtItemFormComponent,
    LotteryFormComponent,
    MembersComponent,
    FilterListComponent,
    ContestantSelButtonsComponent,
    ContestantRowComponent,
    ContestantListComponent,
    LotteryStartComponent,
    CreateLotteryComponent,
    EditLotteryComponent,
    SpinningWheelComponent,
    LoginComponent,
    FlowComponent,
    AboutComponent,
    ArtItemDetailsComponent,
    ArtItemSecondComponent,
];

@NgModule({
    imports: modules.concat([RouterModule.forChild(MaterialRoutes)]),
    exports: modules.concat(components),
    providers: [ModalService, AltModalService],
    declarations: components,
})
export class MaterialComponentsModule {}
