import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { EditAtomicDialogComponent } from './edit-atomic-dialog.component';
import { RecipesModule } from '../recipes.module';

describe('EditAtomicDialogComponent', () => {
  let component: EditAtomicDialogComponent;
  let fixture: ComponentFixture<EditAtomicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { start: 0, duration: 1, end: 2 } },
        { provide: MdDialogRef, useValue: null } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAtomicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
