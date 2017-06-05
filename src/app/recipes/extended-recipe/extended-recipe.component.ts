import { Component,
         OnInit,
         Inject,
         OnChanges,
         ChangeDetectionStrategy,
         SimpleChanges,
         Input } from '@angular/core';
import { Observer } from 'rxjs/Observer';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { RecipeState } from '../../core/recipes-state/recipe-state.enum';
import { recipesDispatcher } from '../../core/recipes-state/state-dispatcher.provider';
import { RecipesAction,
         UpdateRecipeAction } from '../../core/recipes-state/actions';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';

@Component({
  selector: 'app-extended-recipe',
  templateUrl: './extended-recipe.component.html',
  styleUrls: ['./extended-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedRecipeComponent implements OnInit, OnChanges {
  private recipeUpdate: Recipe;

  @Input() recipe: Recipe;

  constructor(@Inject(recipesDispatcher) private dispatcher: Observer<RecipesAction>) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newRecipe: Recipe = changes['recipe'].currentValue;
    this.recipeUpdate = RecipeHelper.shallowClone(newRecipe);
  }

  private onClick(e): void {
    e.stopPropagation();
  }

  private onChange(): void {
    if (this.recipeUpdate.state === RecipeState.New) {
      this.recipeUpdate.state = RecipeState.Draft;
    }
    this.dispatcher.next(new UpdateRecipeAction(this.recipe, this.recipeUpdate));
  }

}
