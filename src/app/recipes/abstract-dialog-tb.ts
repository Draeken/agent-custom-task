import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms';

import { TimeBoundary } from '../core/recipes-state/recipes-state.interface';

export class AbstractDialogTb {
  protected kinds = [
    { value: 0, view: 'Min' },
    { value: 1, view: 'Target' },
    { value: 2, view: 'Max' }];

  constructor(protected formBuilder: FormBuilder) {}

  protected timeBoundaryGroup(values: TimeBoundary): FormGroup {
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

  protected handleTimeBoundaryChange(group: FormGroup, change: TimeBoundary): void {
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
