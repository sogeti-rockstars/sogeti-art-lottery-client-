import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MaterialRoutes } from './material.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

// import { ButtonsComponent } from './example/buttons/buttons.component';
// import { GridComponent } from './example/grid/grid.component';
// import { ListsComponent } from './example/lists/lists.component';
// import { MenuComponent } from './example/menu/menu.component';
// import { TabsComponent } from './example/tabs/tabs.component';
// import { StepperComponent } from './example/stepper/stepper.component';
// import { ExpansionComponent } from './example/expansion/expansion.component';
// import { ChipsComponent } from './example/chips/chips.component';
// import { ToolbarComponent } from './example/toolbar/toolbar.component';
// import { ProgressSnipperComponent } from './example/progress-snipper/progress-snipper.component';
// import { ProgressComponent } from './example/progress/progress.component';
// import { DialogComponent } from './example/dialog/dialog.component';
// import { TooltipComponent } from './example/tooltip/tooltip.component';
// import { SnackbarComponent } from './example/snackbar/snackbar.component';
// import { SliderComponent } from './example/slider/slider.component';
// import { SlideToggleComponent } from './example/slide-toggle/slide-toggle.component';

// import { CdkTableModule } from '@angular/cdk/table';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
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
// import { MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
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

import { ArtItemsListComponent } from './art-items-list/art-items-list.component';
import { ArtItemsComponent } from './art-items/art-items.component';
import { AssociationComponent } from './association/association.component';
import { SearchComponent } from './search/search.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { AppSidebarComponent } from '../layouts/full/sidebar/sidebar.component';
import { AppHeaderComponent } from '../layouts/full/header/header.component';
import { FullComponent } from '../layouts/full/full.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  declarations: [
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SpinnerComponent,
    ArtItemsComponent,
    ThumbnailComponent,
    SearchComponent,
    AssociationComponent,
    ArtItemsListComponent,
  ],
  exports: [
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SpinnerComponent,
    ArtItemsComponent,
    ThumbnailComponent,
    SearchComponent,
    AssociationComponent,
    ArtItemsListComponent,
  ],
})
export class MaterialComponentsModule {}
