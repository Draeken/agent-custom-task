import { Component,
         OnInit,
         Input,
         forwardRef,
         ChangeDetectorRef,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
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
  private startHour = '12:00';
  private startDate: Date;

  @Input() datePlaceholder = 'Select a date';
  @Input() hourPlaceholder = 'Select an hour';

  onChangeFn = (_: number) => {};
  onTouchedFn = () => {};

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  writeValue(value: number): void {
    if (!value) { return; }
    const d = new Date(value);
    this.startDate = d;
    this.startHour = moment(d).format('HH:mm');
    this.ref.markForCheck();
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    if (c.value === undefined || (Number.isInteger(c.value) && c.value > 0)) { return null; }
    return {
      numberFormatError: {
        valid: false
      }
    };
  }

  private onChange(date: Date, time: string) {
    if (!date || !time) { return this.onChangeFn(undefined); }
    const d = new Date(date);
    this.onChangeFn(d.setHours.apply(d, time.split(':')));
  }

}
