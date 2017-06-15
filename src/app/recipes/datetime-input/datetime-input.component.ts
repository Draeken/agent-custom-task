import { Component,
         OnInit,
         Input,
         forwardRef,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
         FormGroup,
         Validators,
         Validator } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-datetime-input',
  templateUrl: './datetime-input.component.html',
  styleUrls: ['./datetime-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatetimeInputComponent),
      multi: true
    }
  ]
})
export class DatetimeInputComponent implements OnInit, ControlValueAccessor, Validator {
  private form = new FormGroup({
    date: new FormControl(null, [this.dateValidator]),
    hour: new FormControl('12:00')
  });
  private startDate = new Date();

  onChangeFn = (_: number) => {};
  onTouchedFn = () => {};

  constructor() {
    this.form.valueChanges.subscribe(value => {
      const date = value.date;
      const time = value.hour;
      if (!date || !time) { return this.onChangeFn(undefined); }
      const d = new Date(date);
      this.startDate = d;
      this.onChangeFn(d.setHours.apply(d, time.split(':')));
    });
  }

  ngOnInit() {
  }

  writeValue(value: number): void {
    if (!value) { return; }
    const d = new Date(value);
    const hour = moment(d).format('HH:mm');
    this.form.patchValue({
      date: d,
      hour: hour
    });
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return this.form.errors;
  }

  private dateValidator(control: FormControl): { [key: string]: any } {
    return control.errors;
  }
}
