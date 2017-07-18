import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { RecipesModule } from '../recipes.module';
import { EditRecurrenceDialogComponent } from './edit-recurrence-dialog.component';

describe('EditRecurrenceDialogComponent', () => {
  let component: EditRecurrenceDialogComponent;
  let fixture: ComponentFixture<EditRecurrenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { recurrence: {} } },
        { provide: MdDialogRef, useValue: null } ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
