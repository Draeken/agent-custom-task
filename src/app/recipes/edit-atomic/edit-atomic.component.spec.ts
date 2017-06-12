import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtomicComponent } from './edit-atomic.component';

describe('EditAtomicComponent', () => {
  let component: EditAtomicComponent;
  let fixture: ComponentFixture<EditAtomicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAtomicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAtomicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
