import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtomicDialogComponent } from './edit-atomic-dialog.component';

describe('EditAtomicDialogComponent', () => {
  let component: EditAtomicDialogComponent;
  let fixture: ComponentFixture<EditAtomicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAtomicDialogComponent ]
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
