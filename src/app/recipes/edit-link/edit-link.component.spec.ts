import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { recipesState } from '../../core/recipes-state/state-dispatcher.provider';
import { EditLinkComponent } from './edit-link.component';
import { RecipesModule } from '../recipes.module';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';

describe('EditLinkComponent', () => {
  let component: EditLinkComponent;
  let fixture: ComponentFixture<EditLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: recipesState, useValue: Observable.of([]) }
      ],
      imports: [ RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkComponent);
    component = fixture.componentInstance;
    component.recipe = RecipeHelper.recipeFactory();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
