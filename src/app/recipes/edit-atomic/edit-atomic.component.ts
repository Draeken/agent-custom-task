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
         EditAtomicDialogComponent } from '../edit-atomic-dialog/edit-atomic-dialog.component';

@Component({
  selector: 'app-edit-atomic',
  templateUrl: './edit-atomic.component.html',
  styleUrls: ['./edit-atomic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAtomicComponent implements OnInit {

  @Input() recipe: Recipe;

  @Output() change = new EventEmitter<void>();

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
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
