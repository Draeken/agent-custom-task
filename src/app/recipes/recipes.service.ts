import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { RecipesState, Recipe } from '../core/recipes-state/recipes-state.interface';
import { recipesDispatcher,
         recipesState } from '../core/recipes-state/state-dispatcher.provider';
import { RecipesAction,
         UpdateRecipesAction } from '../core/recipes-state/actions';
import { WindowRef } from '../core/window.provider';

@Injectable()
export class RecipesService {
  private readonly draftKey = 'draft-recipes';

  constructor(private http: Http,
              @Inject(recipesDispatcher) private dispatcher: Observer<RecipesAction>,
              @Inject(recipesState) private state: Observable<RecipesState>,
              private windowRef: WindowRef) {
    const recipes = this.initDrafts().concat(this.initRecipes());
    this.dispatcher.next(new UpdateRecipesAction(recipes));
  }

  get filteredRecipes(): Observable<Recipe[]> {
    return this.state;
  }

  get allRecipes(): Observable<Recipe[]> {
    return this.state;
  }

  private initRecipes(): Recipe[] {
    // Http request;
    return [];
  }

  private initDrafts(): Recipe[] {
    let draft: Recipe[] = [];
    try {
      draft = JSON.parse(localStorage.getItem(this.draftKey));
      if (!draft) { draft = []; }
    } catch (e) {
      console.error(e);
      draft = [];
    }
    return draft;
    // this.dispatcher.next(new UpdateRecipesAction(draft));
  }

  private getServerAPIAddress(): string {
    return `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}:3001/`;
  }

}
