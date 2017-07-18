import { Input,
         Directive,
         ElementRef,
         OnChanges,
         SimpleChanges } from '@angular/core';

import { RecipeStatus } from '../core/recipes-state/recipe-state.enum';

@Directive({
  selector: '[appStateIndicator]'
})
export class StateIndicatorDirective implements OnChanges {

  @Input('appStateIndicator') state: RecipeStatus;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    const stateChange = changes['state'];
    const state = Number.parseInt(stateChange.currentValue);
    this.el.nativeElement.style.backgroundColor = this.getColor(state);
  }

  private getColor(state: RecipeStatus): string {
    switch (state) {
      case RecipeStatus.Active:
        return '#4CAF50';
      case RecipeStatus.Archive:
        return '#607D8B';
      case RecipeStatus.Draft:
        return '#FFC107';
      default:
        return '';
    }
  }

}
