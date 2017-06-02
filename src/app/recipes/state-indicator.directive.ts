import { Input,
         Directive,
         ElementRef,
         OnChanges,
         SimpleChanges } from '@angular/core';

import { RecipeState } from '../core/recipes-state/recipe-state.enum';

@Directive({
  selector: '[appStateIndicator]'
})
export class StateIndicatorDirective implements OnChanges {

  @Input('appStateIndicator') state: RecipeState;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    const stateChange = changes['state'];
    this.el.nativeElement.style.backgroundColor = this.getColor(stateChange.currentValue);
  }

  private getColor(state: RecipeState): string {
    switch (state) {
      case RecipeState.Active:
        return '#4CAF50';
      case RecipeState.Archive:
        return '#607D8B';
      case RecipeState.Draft:
        return '#FFC107';
      default:
        return '';
    }
  }

}
