import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesService } from './recipes.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  declarations: [RecipesComponent],
  providers: [
    RecipesService,
    AuthGuardService
  ]
})
export class RecipesModule { }
