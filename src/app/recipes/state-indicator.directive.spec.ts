import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StateIndicatorDirective } from './state-indicator.directive';
import { RecipeStatus } from '../core/recipes-state/recipe-state.enum';

@Component({
  template: `
  <h2 appStateIndicator="0">Active</h2>
  <h2 appStateIndicator="1">Archive</h2>
  <h2 appStateIndicator="2">Draft</h2>
  <h2 appStateIndicator="3">New</h2>`
})
class TestComponent { }

describe('StateIndicatorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [StateIndicatorDirective, TestComponent]
    })
    .createComponent(TestComponent)

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(StateIndicatorDirective));
  })

  it('should have 4 state indicator elements', () => {
    expect(des.length).toBe(4);
  });

  it('should color 1st <h2> background to green', () => {
    fixture.detectChanges();
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('rgb(76, 175, 80)');
  });
  it('should color 2nd <h2> background to bluegrey', () => {
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('rgb(96, 125, 139)');
  });

  it('should color 3rd <h2> background to orange', () => {
    const bgColor = des[2].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('rgb(255, 193, 7)');
  });

  it('should not color 4th <h2> background', () => {
    const bgColor = des[3].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('');
  });
});
