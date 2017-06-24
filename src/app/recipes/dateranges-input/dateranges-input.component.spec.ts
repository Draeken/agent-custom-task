import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangesInputComponent } from './dateranges-input.component';

describe('DaterangesInputComponent', () => {
  let component: DaterangesInputComponent;
  let fixture: ComponentFixture<DaterangesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaterangesInputComponent ]
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
});
