import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';
import { ExtendedRecipeComponent } from './extended-recipe.component';
import { recipesDispatcher, recipesState } from '../../core/recipes-state/state-dispatcher.provider';
import { RecipesAction } from '../../core/recipes-state/actions';

describe('ExtendedRecipeComponent', () => {
  let component: ExtendedRecipeComponent;
  let fixture: ComponentFixture<ExtendedRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipesModule ],
      providers: [
        { provide: recipesDispatcher, useValue: new Subject<RecipesAction>() },
        { provide: recipesState, useValue: Observable.of([]) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedRecipeComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
