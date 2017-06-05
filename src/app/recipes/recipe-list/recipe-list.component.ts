import { AfterViewInit,
         Component,
         OnInit,
         ViewChildren,
         ChangeDetectionStrategy,
         QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/withLatestFrom';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { RecipesService } from '../recipes.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  private recipes: Observable<Recipe[]>;
  private extendedRecipe = '';

  @ViewChildren(RecipeComponent) recipeComponents: QueryList<RecipeComponent>;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.recipes = this.recipesService.filteredRecipes; /*.map(recipes => {
      const res = recipes.slice();
      res.unshift(RecipeHelper.recipeFactory());
      return res;
    });*/
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.route.params.subscribe((result: Params) => {
      const params = result;
      console.log('params', params);
      const id = params['id'] || '';
      const instance = params['instance'] || '';
      if (id === '') { return; }
      this.recipeComponents.map(recipeComp => {
        if (recipeComp.recipe.id !== '' && recipeComp.recipe.id === id) {
          recipeComp.expand(instance);
        } else {
          recipeComp.retract();
        }
      });
    });
  }

  onClick() {
    console.log('user click on main container.');
    this.router.navigate(['/']);
  }

  private trackByFn(i: number, item: Recipe): string {
    return item.id;
  }

}
