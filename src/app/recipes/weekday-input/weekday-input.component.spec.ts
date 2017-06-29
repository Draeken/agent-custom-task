import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayInputComponent } from './weekday-input.component';

describe('WeekdayInputComponent', () => {
  let component: WeekdayInputComponent;
  let fixture: ComponentFixture<WeekdayInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekdayInputComponent ]
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
