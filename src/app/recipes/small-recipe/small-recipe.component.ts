import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter } from '@angular/core';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.scss']
})
export class SmallRecipeComponent implements OnInit {

  @Input() recipe: Recipe;

  @Output() expand = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClickToExpand(e) {
    e.stopPropagation();
    this.expand.emit();
  }

}
