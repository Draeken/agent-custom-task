import { Observable } from 'rxjs/Observable'

import { RecipeIdPipe } from './recipe-id.pipe';
import { RecipeHelper } from '../core/recipes-state/recipe-helper'

describe('RecipeIdPipe', () => {
  it('create an instance', () => {
    const recipe = RecipeHelper.recipeFactory();
    recipe.id = '0';
    const pipe = new RecipeIdPipe(Observable.of([recipe]));
    expect(pipe).toBeTruthy();
  });
});
