import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { EditLinkDialogComponent } from './edit-link-dialog.component';
import { RecipesModule } from '../recipes.module';
import { recipesState } from '../../core/recipes-state/state-dispatcher.provider';

describe('EditLinkDialogComponent', () => {
  let component: EditLinkDialogComponent;
  let fixture: ComponentFixture<EditLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: recipesState, useValue: Observable.of([]) },
        { provide: MD_DIALOG_DATA, useValue: { links: [], recipeId: '' } },
        { provide: MdDialogRef, useValue: null },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
