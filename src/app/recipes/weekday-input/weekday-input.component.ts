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
  selector: 'app-weekday-input',
  templateUrl: './weekday-input.component.html',
  styleUrls: ['./weekday-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeekdayInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WeekdayInputComponent),
      multi: true
    }
  ]
})
export class WeekdayInputComponent implements OnInit, ControlValueAccessor, Validator {
  private readonly dayValue = 60 * 24;
  private readonly weekValue = this.dayValue * 7;
  private weekdays: { value: number, view: string }[] = [];
  private weekdaysPlaceholder = 'Weekday';
  private form: FormGroup;

  @Input() defaultTime = '';

  private onChangeFn = (_: number) => {};
  private onTouchedFn = () => {};

  constructor() {
    for (let i = 0; i < 7; ++i) {
      this.weekdays.push({
        value: i,
        view: moment(i, 'e').format('dddd')
      });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      weekday: new FormControl(null, [Validators.required]),
      time: new FormControl(this.defaultTime, [Validators.required])
    });
    this.form.valueChanges.subscribe(this.exportFormValues.bind(this));
  }

  writeValue(value:  number): void {
    if (value == null) { return; }
    if (value >= this.weekValue || value < 0) { console.warn('Invalid value', value); return; }
    const timeValue = value % this.dayValue;
    const weekdayValue = Math.floor(value / this.dayValue);
    this.form.setValue({
      weekday: weekdayValue,
      time: `${this.padNumber(Math.floor(timeValue / 60))}:${this.padNumber(timeValue % 60)}`
    });
  }

  registerOnChange(fn: (_: number) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private exportFormValues(value): void {
    const timeStr: string = value.time;
    const weekdayNb: number = value.weekday;
    if (timeStr === '' || weekdayNb == null) { return this.onChangeFn(undefined); }
    const timeStrArr = timeStr.split(':');
    const timeNb = Number.parseInt(timeStrArr[0]) * 60 + Number.parseInt(timeStrArr[1]);
    this.onChangeFn(timeNb + weekdayNb * this.dayValue);
  }

  private padNumber(num: number): string {
    return ('0' + num).slice(-2);
  }

}
