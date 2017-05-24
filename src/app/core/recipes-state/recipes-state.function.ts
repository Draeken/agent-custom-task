import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { recipesHandler } from './recipes.actions';
import { RecipesState } from './recipes-state.interface';
import { RecipesAction } from './actions';

export function stateFn(initState: RecipesState, actions: Observable<RecipesAction>): Observable<RecipesState> {
  const appStateObs: Observable<RecipesState> = recipesHandler(initState, actions);

  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(initState, obs) {
  const res = new BehaviorSubject(initState);
  obs.subscribe(s => res.next(s));
  return res;
}
