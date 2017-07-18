import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { RecipeComponent } from './recipe.component';
import { RecipesModule } from '../recipes.module';
import { ActivatedRouteStub, RouterStub } from '../../../testing/router-stubs';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
