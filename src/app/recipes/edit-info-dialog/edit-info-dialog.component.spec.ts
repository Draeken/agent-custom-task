import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { EditInfoDialogComponent } from './edit-info-dialog.component';
import { RecipesModule } from '../recipes.module';

describe('EditInfoDialogComponent', () => {
  let component: EditInfoDialogComponent;
  let fixture: ComponentFixture<EditInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { title: 'title', description: 'description' } },
        { provide: MdDialogRef, useValue: null },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
