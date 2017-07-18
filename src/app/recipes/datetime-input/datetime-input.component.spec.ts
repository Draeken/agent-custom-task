import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeInputComponent } from './datetime-input.component';

describe('DatetimeInputComponent', () => {
  let component: DatetimeInputComponent;
  let fixture: ComponentFixture<DatetimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeInputComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit same change when writing value', () => {
    const writeValue = Date.now();
    component.registerOnChange(value => {
      expect(value).toBe(writeValue);
    });
    component.writeValue(writeValue);
  })
});
