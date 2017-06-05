import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRecipeComponent } from './small-recipe.component';

describe('SmallRecipeComponent', () => {
  let component: SmallRecipeComponent;
  let fixture: ComponentFixture<SmallRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});