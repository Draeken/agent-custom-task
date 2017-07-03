import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkDialogComponent } from './edit-link-dialog.component';

describe('EditLinkDialogComponent', () => {
  let component: EditLinkDialogComponent;
  let fixture: ComponentFixture<EditLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinkDialogComponent ]
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
