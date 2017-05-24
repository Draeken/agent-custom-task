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
    this.initRecipes();
  }

  private initRecipes(): void {
    let draft: Recipe[];
    try {
      draft = JSON.parse(localStorage.getItem(this.draftKey));
    } catch (e) {
      console.error(e);
      draft = [];
    }
  }

  private getServerAPIAddress(): string {
    return `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}:3001/`;
  }

}
