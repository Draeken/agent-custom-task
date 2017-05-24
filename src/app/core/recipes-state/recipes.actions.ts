import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { RecipesState } from './recipes-state.interface';
import { AddRecipeAction,
         RecipesAction,
         RemoveRecipeAction,
         UpdateRecipeAction,
         UpdateRecipeInstancesAction,
         UpdateRecipesAction } from './actions';

export function recipesHandler(initState: RecipesState, actions: Observable<RecipesAction>): Observable<RecipesState> {
  return <Observable<RecipesState>>actions.scan((recipes: RecipesState, action: RecipesAction) => {
    if (action instanceof UpdateRecipesAction) {
      return updateRecipes(recipes, action);
    } else {
      return recipes;
    }
  }, initState);
}


function updateRecipes(recipes: RecipesState, action: UpdateRecipesAction): RecipesState {
  return [...action.recipes];
}
