import { Component,
         OnInit,
         OnChanges,
         SimpleChanges,
         Input,
         ElementRef,
         forwardRef,
         ViewChild,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
         FormGroup,
         Validators,
         Validator } from '@angular/forms';
import { HammerInput } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-hour-input',
  templateUrl: './hour-input.component.html',
  styleUrls: ['./hour-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HourInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => HourInputComponent),
      multi: true
    }
  ]
})
export class HourInputComponent implements OnInit, ControlValueAccessor, Validator {
  private form = new FormGroup({
    time: new FormControl('', [Validators.required])
  });

  private onChangeFn = (_: number) => {};
  private onTouchedFn = () => {};

  constructor() {
    this.form.valueChanges.subscribe(value => {
      const timeStr: string = value.time;
      if (timeStr === '') { return this.onChangeFn(undefined); }
      const timeStrArr = timeStr.split(':');
      const timeNb = Number.parseInt(timeStrArr[0]) * 60 + Number.parseInt(timeStrArr[1]);
      this.onChangeFn(timeNb);
    });
  }

  ngOnInit() {

  }

  writeValue(value:  number): void {
    if (value == null) { return; }
    if (value > 1440 || value < 0) { console.warn('Invalid value', value); return; }
    this.form.setValue({
      time: `${this.padNumber(Math.floor(value / 60))}:${this.padNumber(value % 60)}`
    });
  }

  registerOnChange(fn: (_: number) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private padNumber(num: number): string {
    return ('0' + num).slice(-2);
  }

}
