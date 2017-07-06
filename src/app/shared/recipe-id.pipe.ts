import { Pipe,
         Inject,
         PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { recipesState } from '../core/recipes-state/state-dispatcher.provider';
import { RecipesState } from '../core/recipes-state/recipes-state.interface';

@Pipe({
  name: 'recipeId'
})
export class RecipeIdPipe implements PipeTransform {

  constructor(@Inject(recipesState) private state: Observable<RecipesState>) {}

  transform(id: string): Observable<string> {
    return this.state.map(recipes => recipes.find(r => r.id === id).title);
  }

}
