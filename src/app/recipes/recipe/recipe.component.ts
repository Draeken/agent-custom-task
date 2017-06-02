import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter } from '@angular/core';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { transformRecipe } from './recipe-animations';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  animations: [transformRecipe],
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  private isExtended = false;
  private instanceExtended = '';
  private state = 'minimized';

  @Input() recipe: Recipe;

  @Output() selected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  expand(instanceExtended?: string): void {
    this.instanceExtended = instanceExtended;
    this.setExtended(true);
  }

  retract(): void {
    this.instanceExtended = '';
    console.warn('retract', this.recipe);
    this.setExtended(false);
  }

  private onExpand() {
    this.setExtended(true);
    if (this.recipe.id !== undefined) { this.recordRouterState(); }
  }

  private setExtended(v: boolean) {
    this.isExtended = v;
    this.state = v ? 'extanded' : 'minimized';
  }

  private recordRouterState() {
    console.log('save to router');
  }

}
