import { Recipe, Task } from './recipes-state.interface';

export class PopulateRecipesAction {
  constructor(public recipes: Recipe[]) {}
}

export class UpdateRecipeInstancesAction {
  constructor(public instances: Task[], public host: Recipe) { throw new Error('unimplemented'); }
}

export class UpdateRecipesAction {
  constructor(public recipes: { legacy: Recipe, newRecipe: Recipe }[]) {}
}

export class RemoveRecipeAction {
  constructor(public recipe: Recipe) { throw new Error('unimplemented'); }
}

export class ChangeRecipesId {
  constructor(public ids: { legacyId: string, newId: string }[]) {}
}

export type RecipesAction =
  PopulateRecipesAction |
  UpdateRecipeInstancesAction |
  UpdateRecipesAction |
  ChangeRecipesId |
  RemoveRecipeAction;
