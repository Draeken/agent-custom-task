import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter,
         ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { DataInfoDialog,
         EditRestrictionDialogComponent } from '../edit-restriction-dialog/edit-restriction-dialog.component';

@Component({
  selector: 'app-edit-restriction',
  templateUrl: './edit-restriction.component.html',
  styleUrls: ['./edit-restriction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRestrictionComponent implements OnInit {

  @Input() recipe: Recipe;

  @Output() change = new EventEmitter<void>();

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
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

  private handleDialogResult(result: FormGroup): void {
    if (!result || !result.dirty) { return; }
    const value: DataInfoDialog = result.value;
    this.recipe.restrictions = value.restrictions;
    this.change.emit(result.value);
  }

}
