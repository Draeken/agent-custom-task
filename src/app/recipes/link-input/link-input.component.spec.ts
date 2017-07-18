import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Observable } from 'rxjs/Observable';

import { RecipesModule } from '../recipes.module';
import { LinkInputComponent } from './link-input.component';
import { recipesState } from '../../core/recipes-state/state-dispatcher.provider';

describe('LinkInputComponent', () => {
  let component: LinkInputComponent;
  let fixture: ComponentFixture<LinkInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, RecipesModule ],
      providers: [
        { provide: recipesState, useValue: Observable.of([]) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
