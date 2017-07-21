import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { RecipesState, Recipe } from '../core/recipes-state/recipes-state.interface';
import { recipesDispatcher,
         recipesState } from '../core/recipes-state/state-dispatcher.provider';
import { RecipesAction,
         PopulateRecipesAction } from '../core/recipes-state/actions';
import { RecipeHelper } from '../core/recipes-state/recipe-helper';


@Injectable()
export class RecipesService {
  constructor(private http: Http,
              @Inject(recipesDispatcher) private dispatcher: Observer<RecipesAction>,
              @Inject(recipesState) private state: Observable<RecipesState>) {
  }

  get filteredRecipes(): Observable<Recipe[]> {
    return this.state;
  }

  get allRecipes(): Observable<Recipe[]> {
    return this.state;
  }
}
