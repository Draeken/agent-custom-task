import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule,
         MdInputModule } from '@angular/material';
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

@NgModule({
  imports: [
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdInputModule
  ],
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    StateIndicatorDirective,
    SmallRecipeComponent,
    ExtendedRecipeComponent,
    EditInfoComponent,
    NoEmptyPipe,
    EditInfoDialogComponent
  ],
  entryComponents: [
    EditInfoDialogComponent
  ],
  providers: [
    RecipesService,
    AuthGuardService,
  ]
})
export class RecipesModule { }
