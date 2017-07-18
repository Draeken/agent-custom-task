import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtomicComponent } from './edit-atomic.component';
import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';

describe('EditAtomicComponent', () => {
  let component: EditAtomicComponent;
  let fixture: ComponentFixture<EditAtomicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAtomicComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
