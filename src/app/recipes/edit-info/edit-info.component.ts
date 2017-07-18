import { Component,
         OnInit,
         OnChanges,
         AfterViewInit,
         SimpleChanges,
         Input,
         Output,
         ChangeDetectionStrategy,
         EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { Recipe } from '../../core/recipes-state/recipes-state.interface';
import { EditInfoDialogComponent,
         DataInfoDialog} from '../edit-info-dialog/edit-info-dialog.component';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInfoComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() recipe: Recipe;

  @Output() change = new EventEmitter<void>();

  constructor(private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  ngOnChanges(s: SimpleChanges) {
    const recipeChange = s.recipe;
    const recipe: Recipe = recipeChange.currentValue;
    if (!recipe) { return; }
    if (!recipeChange.isFirstChange && !recipe.title) {
      setTimeout(() => this.openDialog(), 0);
    }
  }

  ngAfterViewInit() {
    if (this.recipe && !this.recipe.title) {
      setTimeout(() => this.openDialog(), 0);
    }
  }

  openDialog() {
    const data: DataInfoDialog = {
      title: this.recipe.title,
      description: this.recipe.description
    };
    const dialogRef = this.dialog.open(EditInfoDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(this.handleDialogResult.bind(this));
  }

  private handleDialogResult(result: FormGroup): void {
    if (!result || !result.dirty) { return; }
    const value: DataInfoDialog = result.value;
    this.recipe.title = value.title;
    this.recipe.description = value.description;
    this.change.emit(result.value);
  }
}
