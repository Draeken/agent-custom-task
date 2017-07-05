import { Component,
         OnInit,
         Input,
         Inject,
         forwardRef,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
         FormGroup,
         Validators,
         AbstractControl,
         Validator } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { RecipesState,
         Recipe,
         LinkTask } from '../../core/recipes-state/recipes-state.interface';
import { recipesDispatcher,
         recipesState } from '../../core/recipes-state/state-dispatcher.provider';
import { RecipeStatus } from '../../core/recipes-state/recipe-state.enum';

@Component({
  selector: 'app-recipe-input',
  templateUrl: './recipe-input.component.html',
  styleUrls: ['./recipe-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipeInputComponent),
      multi: true
    }
  ]
})
export class RecipeInputComponent implements OnInit, ControlValueAccessor, Validator {
  private form: FormGroup;
  private recipes: Observable<RecipesState>;

  private onChangeFn = (_: string) => {};
  private onTouchedFn = () => {};

  constructor(@Inject(recipesState) private state: Observable<RecipesState>) {}

  ngOnInit() {
    this.form = new FormGroup({
      recipeId: new FormControl(null)
    });
    this.recipes = this.getrecipeId().valueChanges
      .startWith(null)
      .withLatestFrom(this.state.map(recipes => recipes.filter(r => r.status !== RecipeStatus.New)))
      .map(this.filterRecipeOpts);
    this.form.valueChanges
      .withLatestFrom(this.recipes)
      .subscribe(this.exportFormValues.bind(this));
  }

  writeValue(value:  string): void {
    if (value == null) { return; }
    this.form.setValue({
      recipeId: value
    });
  }

  registerOnChange(fn: (_: string) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private getrecipeId(): AbstractControl {
    return this.form.get('recipeId');
  }

  private exportFormValues(values: [any, Recipe[]]): void {
    const recipes = values[1];
    const id = values[0].recipeId;
    if (!recipes.find(recipe => recipe.id === id)) {
      this.getrecipeId().setErrors({
        'nomatch': `Doesn't match any recipe.`
      });
      return;
    }
    this.getrecipeId().setErrors(null);
    this.onChangeFn(id);
  }

  private filterRecipeOpts(value: [string, Recipe[]]): Recipe[] {
    const title = value[0];
    const recipes = value[1];
    if (!title) { return recipes; }
    return recipes.filter(recipe => new RegExp(`^${title}`, 'gi').test(recipe.title));
  }
}
