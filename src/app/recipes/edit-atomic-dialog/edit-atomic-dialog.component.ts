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
import 'rxjs/add/operator/distinctUntilChanged';

import { TimeBoundary } from '../../core/recipes-state/recipes-state.interface';
import { transformation } from './edit-atomic-dialog.animation';

export interface DataInfoDialog {
  start: TimeBoundary;
  duration: TimeBoundary;
  end: TimeBoundary;
}

@Component({
  selector: 'app-edit-atomic-dialog',
  templateUrl: './edit-atomic-dialog.component.html',
  styleUrls: ['./edit-atomic-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAtomicDialogComponent implements OnInit, AfterViewInit {
  private infoForm: FormGroup;
  private kinds = [
    { value: 0, view: 'Min' },
    { value: 1, view: 'Target' },
    { value: 2, view: 'Max' }];
  private startKind = 1;
  private durationKind = 1;
  private endKind = 1;

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MdDialogRef<EditAtomicDialogComponent>,
              @Inject(MD_DIALOG_DATA) private data: DataInfoDialog) {
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

  private createForm(): void {
    this.infoForm = this.formBuilder.group({
      start: this.timeBoundaryGroup(this.data.start),
      duration: this.timeBoundaryGroup(this.data.end),
      end: this.timeBoundaryGroup(this.data.duration)
    });
  }

  private timeBoundaryGroup(values: TimeBoundary): FormGroup {
    const test = Date.now();
    const group = this.formBuilder.group({
      min: [values.min],
      target: [values.target],
      max: [values.max]
    });
    group.valueChanges
      .distinctUntilChanged((a: TimeBoundary, b: TimeBoundary) => a.max === b.max && a.min === b.min && a.target === b.target)
      .subscribe(this.handleTimeBoundaryChange.bind(this, group));
    return group;
  }

  private handleTimeBoundaryChange(group: FormGroup, change: TimeBoundary): void {
    if (!change.target) { return; }
    const patchValues = {};
    if (group.get('max').pristine) { patchValues['max'] = null; }
    if (group.get('min').pristine) { patchValues['min'] = null; }
    const patchKeys = Object.keys(patchValues);
    if (!patchKeys.length) { return; }
    patchKeys.forEach(k => patchValues[k] = change.target);
    group.patchValue(patchValues);
  }

}
