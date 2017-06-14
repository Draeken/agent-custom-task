import { Component,
         OnInit,
         Input,
         Output,
         ChangeDetectionStrategy,
         ChangeDetectorRef,
         EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { transformRecipe } from './recipe.animations';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  animations: [transformRecipe],
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {
  private isExtended = false;
  private instanceExtended = '';
  private state = 'minimized';

  @Input() recipe: Recipe;

  @Output() selected = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  expand(instanceExtended?: string): void {
    this.instanceExtended = instanceExtended;
    this.setExtended(true);
  }

  retract(): void {
    this.instanceExtended = '';
    this.setExtended(false);
  }

  private onExpand() {
    this.setExtended(true);
    if (this.recipe.id !== undefined) { this.recordRouterState(); }
  }

  private setExtended(v: boolean) {
    if (v === this.isExtended) { return; }
    this.isExtended = v;
    this.state = v ? 'extanded' : 'minimized';
    this.ref.markForCheck();
  }

  private recordRouterState() {
    this.router.navigate(['recipe/', this.recipe.id]);
  }

}
