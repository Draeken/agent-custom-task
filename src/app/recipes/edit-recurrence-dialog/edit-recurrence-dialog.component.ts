import { Component,
         OnInit,
         Input,
         Inject,
         AfterViewInit,
         ViewChildren,
         QueryList,
         ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms';
import { MdDialogRef,
         MdSelect,
         MD_DIALOG_DATA } from '@angular/material';

import { TimeBoundary } from '../../core/recipes-state/recipes-state.interface';
import { AbstractDialogTb } from '../abstract-dialog-tb';

export interface DataInfoDialog {
  recurrence: TimeBoundary;
}

@Component({
  selector: 'app-edit-recurrence-dialog',
  templateUrl: './edit-recurrence-dialog.component.html',
  styleUrls: ['./edit-recurrence-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecurrenceDialogComponent extends AbstractDialogTb implements OnInit, AfterViewInit {
  private infoForm: FormGroup;
  private recurrenceKind = 1;
  private units = [
    { value: 1000 * 60, view: 'min' },
    { value: 1000 * 3600, view: 'hour' },
    { value: 1000 * 3600 * 24, view: 'day' },
    { value: 1000 * 3600 * 24 * 7, view: 'week' },
    { value: 1000 * 60 * 43800, view: 'month' },
    { value: 1000 * 60 * 525600, view: 'year' },
  ];

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  constructor(private dialogRef: MdDialogRef<EditRecurrenceDialogComponent>,
              @Inject(MD_DIALOG_DATA) private data: DataInfoDialog,
              formBuilder: FormBuilder) {
    super(formBuilder);
    this.createForm();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setSelectsToDefault();
  }

  private setSelectsToDefault(): void {
    setTimeout(() => {
      this.selects.forEach((select: MdSelect) => select.writeValue(this.kinds[1].value));
    }, 0);
  }

  private createForm() {
    this.infoForm = this.formBuilder.group({
      recurrence: this.timeBoundaryGroup(this.data.recurrence)
    });
  }

}
