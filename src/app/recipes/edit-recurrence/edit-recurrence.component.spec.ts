import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecurrenceComponent } from './edit-recurrence.component';

describe('EditRecurrenceComponent', () => {
  let component: EditRecurrenceComponent;
  let fixture: ComponentFixture<EditRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
