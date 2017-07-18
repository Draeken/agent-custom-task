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

import { Recipe,
         TimeRestrictions,
         TimeRestriction } from '../../core/recipes-state/recipes-state.interface';
import { DataInfoDialog,
         EditRestrictionDialogComponent } from '../edit-restriction-dialog/edit-restriction-dialog.component';

@Component({
  selector: 'app-edit-restriction',
  templateUrl: './edit-restriction.component.html',
  styleUrls: ['./edit-restriction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRestrictionComponent implements OnInit, OnChanges {

  @Input() recipe: Recipe;

  @Output() change = new EventEmitter<void>();

  private displayHour = false;
  private displayWeekday = false;
  private displayMonth = false;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  ngOnChanges(s: SimpleChanges) {
    const recipe: Recipe = s.recipe.currentValue;
    if (!recipe) {
      this.displayHour = false;
      this.displayWeekday = false;
      this.displayMonth = false;
      return;
    }
    this.displayHour = this.isTimeRestrictionFilled(recipe.restrictions.hour);
    this.displayWeekday = this.isTimeRestrictionFilled(recipe.restrictions.weekday);
    this.displayMonth = this.isTimeRestrictionFilled(recipe.restrictions.month);
  }

  openDialog() {
    const data: DataInfoDialog = {
      restrictions: this.recipe.restrictions
    };
    const dialogRef = this.dialog.open(EditRestrictionDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(this.handleDialogResult.bind(this));
  }

  private isTimeRestrictionFilled(t: TimeRestriction): boolean {
    return t && t.ranges && t.ranges.length > 0;
  }

  private handleDialogResult(result: FormGroup): void {
    if (!result || !result.dirty) { return; }
    const value: TimeRestrictions = result.value;
    this.recipe.restrictions = value;
    this.change.emit(result.value);
  }

}
