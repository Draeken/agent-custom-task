import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Recipe, recipeFactory } from '../../core/recipes-state/recipes-state.interface';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  private recipes: Observable<Recipe[]>;
  private extendedRecipe = '';

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.recipes = this.recipesService.filteredRecipes.map(recipes => {
      recipes.unshift(recipeFactory());
      return recipes;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log('params', params);
      const id = params['id'] || '';
      const instance = params['instance'] || '';
      this.extendedRecipe = `${id};${instance}`;
    });
  }

  onClick() {
    console.log('user click on main container.');
    this.router.navigate(['/']);
  }

}
