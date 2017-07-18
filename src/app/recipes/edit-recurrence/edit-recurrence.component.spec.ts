import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecurrenceComponent } from './edit-recurrence.component';
import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';

describe('EditRecurrenceComponent', () => {
  let component: EditRecurrenceComponent;
  let fixture: ComponentFixture<EditRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecurrenceComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
