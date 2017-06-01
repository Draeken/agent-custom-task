import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedRecipeComponent } from './extended-recipe.component';

describe('ExtendedRecipeComponent', () => {
  let component: ExtendedRecipeComponent;
  let fixture: ComponentFixture<ExtendedRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
