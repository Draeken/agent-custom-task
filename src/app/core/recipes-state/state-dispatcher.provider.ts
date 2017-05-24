import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { stateFn } from './recipes-state.function';
import { RecipesAction } from './actions';
import { RecipesState } from './recipes-state.interface';

export const initState = new InjectionToken<RecipesState>('init.recipes.state');
export const recipesDispatcher = new InjectionToken<Subject<RecipesAction>>('recipes.dispatcher');
export const recipesState = new InjectionToken<Observable<RecipesState>>('recipes.state');

export function dispatcherSubject() {
  const s = new Subject<RecipesAction>();
  return s;
}

export const recipesStateAndDispatcherProvider = [
  {
    provide: initState,
    useValue: []
  },
  {
    provide: recipesDispatcher,
    useFactory: dispatcherSubject
  },
  {
    provide: recipesState,
    useFactory: stateFn,
    deps: [initState, recipesDispatcher]
  }
];
