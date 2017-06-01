import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesService } from './recipes.service';
import { AuthGuardService } from './auth-guard.service';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { StateIndicatorDirective } from './state-indicator.directive';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import { ExtendedRecipeComponent } from './extended-recipe/extended-recipe.component';
import { EditInfoComponent } from './edit-info/edit-info.component';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    StateIndicatorDirective,
    SmallRecipeComponent,
    ExtendedRecipeComponent,
    EditInfoComponent
  ],
  providers: [
    RecipesService,
    AuthGuardService
  ]
})
export class RecipesModule { }
