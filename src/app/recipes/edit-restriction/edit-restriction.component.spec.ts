import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';
import { EditRestrictionComponent } from './edit-restriction.component';

describe('EditRestrictionComponent', () => {
  let component: EditRestrictionComponent;
  let fixture: ComponentFixture<EditRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestrictionComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
