import { Component,
         OnInit,
         Input,
         forwardRef,
         AfterViewInit,
         ViewChildren,
         QueryList,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
         Validator } from '@angular/forms';
import { MdSelect } from '@angular/material';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    }
  ]
})
export class DurationInputComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {
  private duration;
  private selectedUnit = 1000 * 60;
  private units = [
    { value: 1000, view: 'sec' },
    { value: 1000 * 60, view: 'min' }
  ];

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  onChangeFn = (_: number) => {};
  onTouchedFn = () => {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setSelectsToDefault();
  }

  private setSelectsToDefault(): void {
    setTimeout(() => {
      this.selects.forEach((select: MdSelect) => select.writeValue(this.units[1].value));
    }, 0);
  }

  writeValue(value: number): void {
    if (value == null) { return; }
    this.duration = value;
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    if (c.value == null || c.value < 0) { return null; }
    return {
      numberFormatError: {
        valid: false
      }
    };
  }

  private onChange(userDuration) {
    console.log('userDuration', userDuration);
    // use pristine / set pristine programatically to ignore change from unit change
    if (userDuration === '') { return this.onChangeFn(undefined); }
    let duration = userDuration * this.selectedUnit;
    if (this.selectedUnit === 1000) { duration = Math.floor(duration); }
    if (this.duration !== duration) { this.duration = duration; }
    this.onChangeFn(duration);
  }
}
