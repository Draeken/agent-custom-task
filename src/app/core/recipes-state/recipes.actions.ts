import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { RecipesState } from './recipes-state.interface';
import { RecipeStatus } from './recipe-state.enum';
import { AddRecipeAction,
         RecipesAction,
         RemoveRecipeAction,
         UpdateRecipeAction,
         UpdateRecipeInstancesAction,
         UpdateRecipesAction } from './actions';
import { RecipeHelper } from './recipe-helper';
export function recipesHandler(initState: RecipesState, actions: Observable<RecipesAction>): Observable<RecipesState> {
  return <Observable<RecipesState>>actions.scan((recipes: RecipesState, action: RecipesAction) => {
    if (action instanceof UpdateRecipesAction) {
      return updateRecipes(recipes, action);
    } else if (action instanceof UpdateRecipeAction) {
      return updateRecipe(recipes, action);
    } else {
      return recipes;
    }
  }, initState);
}


function updateRecipes(recipes: RecipesState, action: UpdateRecipesAction): RecipesState {
  const list = action.recipes.slice();
  list.unshift(RecipeHelper.recipeFactory());
  return list;
}

function updateRecipe(recipes: RecipesState, action: UpdateRecipeAction): RecipesState {
  const result = recipes.slice();
  const i = result.findIndex(r => r === action.legacyRecipe);
  if (i === -1) {
    result.push(action.newRecipe);
  } else {
    result[i] = action.newRecipe;
  }
  if (!result.some(recipe => recipe.status === RecipeStatus.New)) { result.unshift(RecipeHelper.recipeFactory()); }
  return result;
}
