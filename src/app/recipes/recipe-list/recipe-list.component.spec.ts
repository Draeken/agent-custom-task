import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipesModule } from '../recipes.module';
import { RecipeListComponent } from './recipe-list.component';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { ActivatedRouteStub, RouterStub } from '../../../testing/router-stubs';

class FakeRecipeService {
  get filteredRecipes(): Observable<Recipe[]> {
    return Observable.of([]);
  }
}

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: RecipesService, useClass: FakeRecipeService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
