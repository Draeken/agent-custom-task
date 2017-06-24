import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestrictionDialogComponent } from './edit-restriction-dialog.component';

describe('EditRestrictionDialogComponent', () => {
  let component: EditRestrictionDialogComponent;
  let fixture: ComponentFixture<EditRestrictionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRestrictionDialogComponent ]
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
