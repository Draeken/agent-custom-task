import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule,
         MdInputModule,
         MdDatepickerModule,
         MdSelectModule,
         MdTabsModule,
         MdRadioModule,
         GestureConfig,
         MdChipsModule,
         MdAutocompleteModule,
         MdNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesService } from './recipes.service';
import { AuthGuardService } from './auth-guard.service';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { StateIndicatorDirective } from './state-indicator.directive';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import { ExtendedRecipeComponent } from './extended-recipe/extended-recipe.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { NoEmptyPipe } from './no-empty.pipe';
import { EditInfoDialogComponent } from './edit-info-dialog/edit-info-dialog.component';
import { EditAtomicComponent } from './edit-atomic/edit-atomic.component';
import { TimeBoundaryPipe } from './time-boundary.pipe';
import { EditAtomicDialogComponent } from './edit-atomic-dialog/edit-atomic-dialog.component';
import { DatetimeInputComponent } from './datetime-input/datetime-input.component';
import { DurationInputComponent } from './duration-input/duration-input.component';
import { DurationPipe } from './duration.pipe';
import { EditRecurrenceComponent } from './edit-recurrence/edit-recurrence.component';
import { EditRecurrenceDialogComponent } from './edit-recurrence-dialog/edit-recurrence-dialog.component';
import { EditRestrictionComponent } from './edit-restriction/edit-restriction.component';
import { EditRestrictionDialogComponent } from './edit-restriction-dialog/edit-restriction-dialog.component';
import { DaterangesInputComponent } from './dateranges-input/dateranges-input.component';
import { HourInputComponent } from './hour-input/hour-input.component';
import { TimePipe } from './time.pipe';
import { WeekdayInputComponent } from './weekday-input/weekday-input.component';
import { MonthInputComponent } from './month-input/month-input.component';
import { EditLinkComponent } from './edit-link/edit-link.component';
import { EditLinkDialogComponent } from './edit-link-dialog/edit-link-dialog.component';
import { RecipeInputComponent } from './recipe-input/recipe-input.component';
import { LinkInputComponent } from './link-input/link-input.component';

@NgModule({
  imports: [
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdInputModule,
    MdDatepickerModule,
    MdSelectModule,
    MdTabsModule,
    MdRadioModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdNativeDateModule
  ],
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    StateIndicatorDirective,
    SmallRecipeComponent,
    ExtendedRecipeComponent,
    EditInfoComponent,
    NoEmptyPipe,
    EditInfoDialogComponent,
    EditAtomicComponent,
    TimeBoundaryPipe,
    EditAtomicDialogComponent,
    DatetimeInputComponent,
    DurationInputComponent,
    DurationPipe,
    EditRecurrenceComponent,
    EditRecurrenceDialogComponent,
    EditRestrictionComponent,
    EditRestrictionDialogComponent,
    DaterangesInputComponent,
    HourInputComponent,
    TimePipe,
    WeekdayInputComponent,
    MonthInputComponent,
    EditLinkComponent,
    EditLinkDialogComponent,
    RecipeInputComponent,
    LinkInputComponent
  ],
  entryComponents: [
    EditInfoDialogComponent,
    EditAtomicDialogComponent,
    EditRecurrenceDialogComponent,
    EditRestrictionDialogComponent,
    EditLinkDialogComponent
  ],
  providers: [
    RecipesService,
    AuthGuardService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ]
})
export class RecipesModule { }
