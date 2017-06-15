import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecurrenceDialogComponent } from './edit-recurrence-dialog.component';

describe('EditRecurrenceDialogComponent', () => {
  let component: EditRecurrenceDialogComponent;
  let fixture: ComponentFixture<EditRecurrenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecurrenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecurrenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
