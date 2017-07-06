import { Component,
         OnInit,
         OnChanges,
         SimpleChanges,
         Input,
         Output,
         EventEmitter,
         ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { Recipe, TimeBoundary } from '../../core/recipes-state/recipes-state.interface';
import { RecipeHelper } from '../../core/recipes-state/recipe-helper';
import { DataInfoDialog,
         EditAtomicDialogComponent } from '../edit-atomic-dialog/edit-atomic-dialog.component';

@Component({
  selector: 'app-edit-atomic',
  templateUrl: './edit-atomic.component.html',
  styleUrls: ['./edit-atomic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAtomicComponent implements OnInit, OnChanges {

  @Input() recipe: Recipe;

  @Output() change = new EventEmitter<void>();

  private displayStart = false;
  private displayEnd = false;
  private displayDuration = false;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  ngOnChanges(s: SimpleChanges) {
    const recipe: Recipe = s.recipe.currentValue;
    if (!recipe)  { return; }
    this.displayEnd = RecipeHelper.isTimeBoundaryEmpty(recipe.atomic.end) ? false : true;
    this.displayStart = RecipeHelper.isTimeBoundaryEmpty(recipe.atomic.start) ? false : true;
    this.displayDuration = RecipeHelper.isTimeBoundaryEmpty(recipe.atomic.duration) ? false : true;
  }

  openDialog() {
    const atomic = this.recipe.atomic;
    const data: DataInfoDialog = {
      start: atomic.start,
      duration: atomic.duration,
      end: atomic.end
    };
    const dialogRef = this.dialog.open(EditAtomicDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(this.handleDialogResult.bind(this));
  }

  private handleDialogResult(result: FormGroup): void {
    if (!result || !result.dirty) { return; }
    const value: DataInfoDialog = result.value;
    this.recipe.atomic = value; // deep copy ?
    this.change.emit(result.value);
  }

}
