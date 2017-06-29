import { Component,
         OnInit,
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
  selector: 'app-month-input',
  templateUrl: './month-input.component.html',
  styleUrls: ['./month-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MonthInputComponent),
      multi: true
    }
  ]
})
export class MonthInputComponent implements OnInit, ControlValueAccessor, Validator  {
  private readonly yearValue = 366;
  private invalidDateMsg = 'Invalid date';
  private form: FormGroup;
  private minDate: Date;
  private maxDate: Date;
  private startDate: Date;
  private year = new Date().getFullYear();

  private onChangeFn = (_: number) => {};
  private onTouchedFn = () => {};

  constructor() {
    this.minDate = new Date(this.year, 0, 0);
    this.maxDate = new Date(this.year, 11, 31, 24);
  }

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(null, [Validators.required]),
    });
    this.form.valueChanges.subscribe(this.exportFormValues.bind(this));
  }

  writeValue(value:  number): void {
    if (value == null) { return; }
    if (value > this.yearValue || value < 0) { console.warn('Invalid value', value); return; }
    const date = moment().year(this.year).dayOfYear(value).toDate();
    this.form.setValue({
      date: date
    });
    this.startDate = date;
  }

  registerOnChange(fn: (_: number) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private exportFormValues(value): void {
    const date: Date = value.date;
    if (date == null) { return this.onChangeFn(undefined); }
    this.startDate = date;
    const dayOfYear = moment(date).dayOfYear();
    this.onChangeFn(dayOfYear);
  }
}
