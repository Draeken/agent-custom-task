import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { RecipesState } from './recipes-state.interface';
import { RecipeStatus } from './recipe-state.enum';
import { AddRecipeAction,
         RecipesAction,
         RemoveRecipeAction,
         UpdateRecipesAction,
         UpdateRecipeInstancesAction,
         PopulateRecipesAction } from './actions';
import { RecipeHelper } from './recipe-helper';

export function recipesHandler(initState: RecipesState, actions: Observable<RecipesAction>): Observable<RecipesState> {
  return <Observable<RecipesState>>actions.scan((recipes: RecipesState, action: RecipesAction) => {
    if (action instanceof PopulateRecipesAction) {
      return populateRecipes(recipes, action);
    } else if (action instanceof UpdateRecipesAction) {
      return updateRecipes(recipes, action);
    } else {
      return recipes;
    }
  }, initState);
}


function populateRecipes(recipes: RecipesState, action: PopulateRecipesAction): RecipesState {
  const list = action.recipes.slice();
  list.unshift(RecipeHelper.recipeFactory());
  return list;
}

function updateRecipes(recipes: RecipesState, action: UpdateRecipesAction): RecipesState {
  const result = recipes.slice();
  action.recipes.forEach(change => {
    const i = result.findIndex(r => r === change.legacy);
    if (i === -1) {
      result.push(change.newRecipe);
    } else {
      result[i] = change.newRecipe;
    }
  });
  if (!result.some(recipe => recipe.status === RecipeStatus.New)) { result.unshift(RecipeHelper.recipeFactory()); }
  return result;
}
