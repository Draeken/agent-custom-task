import { Recipe, Task } from './recipes-state.interface';

export class UpdateRecipesAction {
  constructor(public recipes: Recipe[]) {}
}

export class UpdateRecipeInstancesAction {
  constructor(public instances: Task[], public host: Recipe) {}
}

export class AddRecipeAction {
  constructor(public recipe: Recipe) {}
}

export class UpdateRecipeAction {
  constructor(public legacyRecipe: Recipe, public newRecipe: Recipe) {}
}

export class RemoveRecipeAction {
  constructor(public recipe: Recipe) {}
}

export type RecipesAction =
  UpdateRecipesAction |
  UpdateRecipeInstancesAction |
  AddRecipeAction |
  UpdateRecipeAction |
  RemoveRecipeAction;
