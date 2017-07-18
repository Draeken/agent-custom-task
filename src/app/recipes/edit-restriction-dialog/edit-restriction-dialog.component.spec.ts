import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { RecipesModule } from '../recipes.module';
import { EditRestrictionDialogComponent } from './edit-restriction-dialog.component';

describe('EditRestrictionDialogComponent', () => {
  let component: EditRestrictionDialogComponent;
  let fixture: ComponentFixture<EditRestrictionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { restrictions: {} } },
        { provide: MdDialogRef, useValue: null } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestrictionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
