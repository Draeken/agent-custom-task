import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { RecipesModule } from '../recipes.module';
import { WeekdayInputComponent } from './weekday-input.component';

describe('WeekdayInputComponent', () => {
  let component: WeekdayInputComponent;
  let fixture: ComponentFixture<WeekdayInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
