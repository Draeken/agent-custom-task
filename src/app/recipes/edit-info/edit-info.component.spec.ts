import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { EditInfoComponent } from './edit-info.component';
import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';

describe('EditInfoComponent', () => {
  let component: EditInfoComponent;
  let fixture: ComponentFixture<EditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
