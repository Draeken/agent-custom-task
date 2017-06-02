import { Recipe, Task } from './recipes-state.interface';

export class UpdateRecipesAction {
  constructor(public recipes: Recipe[]) {}
}

export class UpdateRecipeInstancesAction {
  constructor(public instances: Task[], public host: Recipe) { throw new Error('unimplemented'); }
}

export class AddRecipeAction {
  constructor(public recipe: Recipe) { throw new Error('unimplemented'); }
}

export class UpdateRecipeAction {
  constructor(public legacyRecipe: Recipe, public newRecipe: Recipe) {}
}

export class RemoveRecipeAction {
  constructor(public recipe: Recipe) { throw new Error('unimplemented'); }
}

export type RecipesAction =
  UpdateRecipesAction |
  UpdateRecipeInstancesAction |
  AddRecipeAction |
  UpdateRecipeAction |
  RemoveRecipeAction;
