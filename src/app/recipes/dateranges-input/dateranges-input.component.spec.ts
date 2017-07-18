import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangesInputComponent } from './dateranges-input.component';
import { RecipesModule } from '../recipes.module';

describe('DaterangesInputComponent', () => {
  let component: DaterangesInputComponent;
  let fixture: ComponentFixture<DaterangesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipesModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit same change when writing value', () => {
    const writeValue: [number, number][] = [[0, 1], [2, 3]];
    component.type = 'hour';
    component.registerOnChange(value => {
      expect(value.every((v, i) => v.every((vp, ip) => vp === i * 2 + ip))).toBeTruthy();
    });
    component.writeValue(writeValue);
  })
});
