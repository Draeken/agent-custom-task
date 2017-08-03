import { Injectable,
         Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RecipesState, Recipe } from '../core/recipes-state/recipes-state.interface';
import { RecipeStatus } from '../core/recipes-state/recipe-state.enum';
import { RecipeHelper } from '../core/recipes-state/recipe-helper';
import { RecipesAction,
         UpdateRecipesAction,
         ChangeRecipesId,
         PopulateRecipesAction } from '../core/recipes-state/actions';
import { recipesDispatcher,
         recipesState } from './recipes-state/state-dispatcher.provider'
import { WindowRef } from '../core/window.provider';
import { UserService } from '../core/user.service';
import { HttpHelper } from '../core/http-helper';

import 'rxjs/add/operator/pairwise';

@Injectable()
export class DataIoService {

  constructor(@Inject(recipesDispatcher) private dispatcher: Subject<RecipesAction>,
              @Inject(recipesState) private state: Observable<RecipesState>,
              private userService: UserService,
              private http: Http,
              private windowRef: WindowRef) {
    userService.isLoggedObs
      .filter(isLogged => isLogged)
      .subscribe(this.requestRecipes.bind(this));
    dispatcher.subscribe(this.notifyChange.bind(this));
  }

  private requestRecipes(): void {
    const serverUrl = this.getServerAPIAddress();
    const payload = Object.assign({}, this.userService.userToken);
    this.http.post(serverUrl + `user/request-recipes/`, payload, HttpHelper.getJsonHeader())
      .map(HttpHelper.extractBody)
      .subscribe(this.handleRequestResponse.bind(this));
  }

  private handleRequestResponse(body: any): void {
    const recipes = body.recipes.map(RecipeHelper.normalizeRecipe);
    this.dispatcher.next(new PopulateRecipesAction(recipes));
  }

  private getServerAPIAddress(): string {
    return `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}:3001/`;
  }

  private notifyChange(action: RecipesAction): void {
    if (action instanceof UpdateRecipesAction) {
      const serverUrl = this.getServerAPIAddress();
      const payload = Object.assign({ recipes: action.recipes }, this.userService.userToken);
      this.http.post(serverUrl + `user/update-recipes`, payload, HttpHelper.getJsonHeader())
        .map(HttpHelper.extractBody)
        .subscribe(this.handleNotifyResponse.bind(this))
    }
  }

  private handleNotifyResponse(body: any): void {
    const ids = body.ids;
    this.dispatcher.next(new ChangeRecipesId(ids));
  }

}
