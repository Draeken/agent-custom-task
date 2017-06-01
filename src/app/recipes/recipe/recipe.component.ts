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

  @Input()
  get extended(): string { return this.isExtended ? `${this.recipe.id};${this.instanceExtended}` : ''; };
  set extended(value: string) {
    this.setExtended(value.startsWith(`${this.recipe.id}`) && (this.recipe.id !== undefined || value.indexOf(';') === 0));

    if (!this.isExtended) { this.instanceExtended = ''; return; }
    const startIndex = value.indexOf(';');
    if (startIndex === -1) { this.instanceExtended = ''; return; }
    this.instanceExtended = value.slice(startIndex + 1);
  }

  @Output() selected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onExpand() {
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
