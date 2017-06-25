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

import { TimeRestrictions,
         TimeRestriction } from '../../core/recipes-state/recipes-state.interface';

export interface DataInfoDialog {
  restrictions: TimeRestrictions;
}

@Component({
  selector: 'app-edit-restriction-dialog',
  templateUrl: './edit-restriction-dialog.component.html',
  styleUrls: ['./edit-restriction-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRestrictionDialogComponent implements OnInit {
  private form: FormGroup;
  private conditions = [
    { value: 0, view: 'in range' },
    { value: 1, view: 'out range' },
  ];
  private kinds = ['hour', 'weekday', 'month'];

  constructor(private dialogRef: MdDialogRef<EditRestrictionDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: DataInfoDialog) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    const restrictions = this.data.restrictions;
    this.form = this.formBuilder.group({
      hour: this.createTRGroup(restrictions.hour),
      weekday: this.createTRGroup(restrictions.weekday),
      month: this.createTRGroup(restrictions.month)
    });
  }

  private createTRGroup(tr: TimeRestriction): FormGroup {
    const group = this.formBuilder.group({
      condition: tr ? tr.condition : 0,
      ranges: tr ? [tr.ranges] : [] // Handle array as [value, validators]
    });
    return group;
  }

}
