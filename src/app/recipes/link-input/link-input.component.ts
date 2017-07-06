import { Component,
         OnInit,
         Input,
         forwardRef,
         AfterViewInit,
         ViewChildren,
         QueryList,
         ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,
         ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         Validator,
         FormControl,
         FormGroup,
         AbstractControl,
         FormArray } from '@angular/forms';
import { MdSelect,
         MD_DIALOG_DATA } from '@angular/material';

import { Recipe,
         LinkTask } from '../../core/recipes-state/recipes-state.interface';
import { RecipeStatus } from '../../core/recipes-state/recipe-state.enum';
import { AbstractDialogTb } from '../abstract-dialog-tb';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinkInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LinkInputComponent),
      multi: true
    }
  ]
})
export class LinkInputComponent extends AbstractDialogTb implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  private form: FormGroup;
  private selectedKind = 1;
  private delayKinds: { value: string, view: string }[];
  private units = [
    { value: 1000 * 60, view: 'min' },
    { value: 1000 * 3600, view: 'hour' },
    { value: 1000 * 3600 * 24, view: 'day' },
    { value: 1000 * 3600 * 24 * 7, view: 'week' },
    { value: 1000 * 60 * 43800, view: 'month' },
    { value: 1000 * 60 * 525600, view: 'year' },
  ];
  private excluded: string[];

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  @Input() recipeId: string;

  onChangeFn = (_: LinkTask) => {};
  onTouchedFn = () => {};

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
    this.createForm();
    this.delayKinds = [
      { value: 'before', view: 'before' },
      { value: 'after', view: 'after' },
    ];
    this.form.valueChanges.subscribe(newValue => this.onChangeFn(newValue));
  }

  ngOnInit() {
    this.excluded = [this.recipeId];
  }

  ngAfterViewInit() {
    this.setSelectsToDefault();
  }

  writeValue(value: LinkTask): void {
    if (value == null) { return; }
    this.form.setValue({
      kind: value.kind,
      recipeId: value.recipeId,
      timeElapsed: {
        min: value.timeElapsed.min,
        target: value.timeElapsed.target,
        max: value.timeElapsed.max
      }
    });
  }

  registerOnChange(fn: (_: LinkTask) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return c.errors;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      kind: null,
      recipeId: '',
      timeElapsed: this.timeBoundaryGroup({})
    });
  }

  private setSelectsToDefault(): void {
    setTimeout(() => {
      this.selects.forEach((select: MdSelect) => {
        select.writeValue(this.kinds[1].value);
      })
    }, 0);
  }

}
