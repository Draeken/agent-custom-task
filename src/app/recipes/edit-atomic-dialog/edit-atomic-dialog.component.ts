import { Component,
         OnInit,
         Input,
         Inject,
         AfterViewInit,
         ViewChildren,
         QueryList,
         ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,
         FormGroup } from '@angular/forms';
import { MdSelect,
         MD_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/distinctUntilChanged';

import { TimeBoundary } from '../../core/recipes-state/recipes-state.interface';
import { AbstractDialogTb } from '../abstract-dialog-tb';

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
export class EditAtomicDialogComponent extends AbstractDialogTb implements OnInit, AfterViewInit {
  private infoForm: FormGroup;
  private startKind = 1;
  private durationKind = 1;
  private endKind = 1;

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  constructor(@Inject(MD_DIALOG_DATA) private data: DataInfoDialog,
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

  private createForm(): void {
    this.infoForm = this.formBuilder.group({
      start: this.timeBoundaryGroup(this.data.start),
      duration: this.timeBoundaryGroup(this.data.duration),
      end: this.timeBoundaryGroup(this.data.end)
    });
  }
}
