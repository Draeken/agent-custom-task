import { Component,
         OnInit,
         Input,
         Inject,
         forwardRef,
         ChangeDetectorRef,
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
import { Subject } from 'rxjs/Subject';

import { RecipesState,
         Recipe,
         LinkTask } from '../../core/recipes-state/recipes-state.interface';
import { recipesState } from '../../core/recipes-state/state-dispatcher.provider';
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
  private writeForm: Subject<string> = new Subject();

  @Input() excluded: string[] = [];

  private onChangeFn = (_: string) => {};
  private onTouchedFn = () => {};

  constructor(@Inject(recipesState) private state: Observable<RecipesState>,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = new FormGroup({
      recipe: new FormControl(null)
    });
    this.recipes = this.getRecipeController().valueChanges
      .startWith(null)
      .withLatestFrom(this.getRecipesObs.apply(this))
      .map(this.filterRecipeOpts.bind(this));
    this.form.valueChanges
      .withLatestFrom(this.getRecipesObs.apply(this))
      .subscribe(this.exportFormValues.bind(this));
    this.writeForm
      .withLatestFrom(this.getRecipesObs.apply(this))
      .subscribe((values: [string, Recipe[]]) => {
        const recipe = values[1].find(r => r.id === values[0]);
        if (!recipe) { return; }
        this.form.setValue({ recipe: recipe })
        setTimeout(() => this.ref.markForCheck(), 0);
      });
  }

  writeValue(value:  string): void {
    if (value == null) { return; }
    this.writeForm.next(value);
  }

  registerOnChange(fn: (_: string) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private getRecipesObs(): Observable<Recipe[]> {
    return this.state.map(recipes => recipes.filter(
      r => r.status !== RecipeStatus.New &&
      !this.excluded.find(exc => exc === r.id)))
  }

  private getRecipeController(): AbstractControl {
    return this.form.get('recipe');
  }

  private exportFormValues(values: [any, Recipe[]]): void {
    const recipes = values[1];
    const id = values[0].recipe.id;
    if (!recipes.find(recipe => recipe.id === id)) {
      this.getRecipeController().setErrors({
        'nomatch': `Doesn't match any recipe.`
      });
      return;
    }
    this.getRecipeController().setErrors(null);
    this.onChangeFn(id);
  }

  private displayRecipeOpt(recipeOpt: Recipe): string {
    return recipeOpt ? recipeOpt.title : '';
  }

  private filterRecipeOpts(value: [string, Recipe[]]): Recipe[] {
    const title = value[0];
    const recipes = value[1];
    if (!title) { return recipes; }
    return recipes
      .filter(recipe => new RegExp(`^${title}`, 'gi').test(recipe.title))
  }
}
