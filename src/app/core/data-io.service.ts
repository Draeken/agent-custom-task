import { Injectable,
         Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { RecipesState, Recipe } from '../core/recipes-state/recipes-state.interface';
import { RecipesAction,
         UpdateRecipesAction } from '../core/recipes-state/actions';
import { recipesDispatcher,
         recipesState } from './recipes-state/state-dispatcher.provider'

@Injectable()
export class DataIoService {

  constructor(@Inject(recipesDispatcher) private dispatcher: Observer<RecipesAction>,
              @Inject(recipesState) private state: Observable<RecipesState>) {

              }

}
