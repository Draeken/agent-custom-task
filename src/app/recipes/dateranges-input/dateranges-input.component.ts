import { Component,
         OnInit,
         OnChanges,
         SimpleChanges,
         Input,
         ElementRef,
         forwardRef,
         ViewChild,
         ViewChildren,
         ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,
         NG_VALIDATORS,
         FormControl,
         FormGroup,
         Validator } from '@angular/forms';
import { HammerInput, MdChip } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/skip';

import * as moment from 'moment';

interface RangeInput {
  start: number;
  end: number;
  focused: boolean;
}

interface Dimension {
  offsetTop: number;
  offsetLeft: number;
  clientWidth: number;
  clientHeight: number;
}

@Component({
  selector: 'app-dateranges-input',
  templateUrl: './dateranges-input.component.html',
  styleUrls: ['./dateranges-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DaterangesInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DaterangesInputComponent),
      multi: true
    }
  ]
})
export class DaterangesInputComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() type: string;

  @ViewChild('editFocusedRange') editPanel: ElementRef;
  @ViewChild('editMask') editMask: ElementRef;


  private tiles: { value: number; view: string }[] = [];
  private ranges: BehaviorSubject<RangeInput[]> = new BehaviorSubject([]);
  private form = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  private maxTime: number;
  private focusedRange: BehaviorSubject<RangeInput> = new BehaviorSubject(undefined);
  private lastRangeDim: Dimension;
  private chipSelected: Subject<MdChip> = new Subject();

  private onChangeFn = (_: number) => {};
  private onTouchedFn = () => {};

  constructor() {
    this.ranges.map(ranges => ranges.find(r => r.focused)).subscribe(range => this.focusedRange.next(range));
    this.focusedRange.subscribe(range => this.form.setValue({ start: range ? range.start : null, end: range ? range.end : null }));
    this.focusedRange
      .filter(r => r === undefined)
      .skip(2)
      .do(() => {
        this.fitPanelToDim.call(this);
        (<HTMLElement>this.editMask.nativeElement).style.opacity = '0';
      })
      .delay(225)
      .subscribe(() => {
        (<HTMLElement>this.editPanel.nativeElement).style.display = 'none';
      });
    this.chipSelected
      .do(this.handleChipSelected.bind(this))
      .do(this.setPanelEndPos.bind(this))
      .delay(255)
      .subscribe(() => {
        const e: HTMLElement = this.editMask.nativeElement;
        e.style.opacity = '1';
      });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    switch (changes.type.currentValue) {
      case 'hour':
        this.maxTime = 60 * 24;
        this.buildTiles(24, this.hourViewFunc);
        break;
      case 'weekday':
        this.maxTime = 60 * 24 * 7;
        this.buildTiles(7, this.weekdayViewFunc);
        break;
      case 'month':
        this.maxTime = 365;
        this.buildTilesFromMonth();
        break;
    }
  }

  writeValue(value:  [number, number][]): void {
    if (!value) { this.ranges.next([]); return; }
    this.ranges.next(value.map(range => ({ start: range[0], end: range[1], focused: false })));
  }

  registerOnChange(fn: (_: number) => void): void { this.onChangeFn = fn; }

  registerOnTouched(fn: () => void): void { this.onTouchedFn = fn; }

  validate(c: FormControl) {
    return null;
  }

  private handleChipSelected(chip: any): void {
    const t: HTMLElement = chip._elementRef.nativeElement;
    this.lastRangeDim = {
      clientHeight: t.clientHeight,
      clientWidth: t.clientWidth,
      offsetLeft: t.offsetLeft,
      offsetTop: t.offsetTop,
    };
    this.setPanelStartPos();
  }

  private onChipSelected(event): void {
    this.chipSelected.next(event.chip);
  }

  private onClick(event: MouseEvent) {
    console.log(event);
  }

  private onSlide(event: HammerInput) {
    event.preventDefault();
    console.log(event);
  }

  private onSlideStart(event: HammerInput) {
    event.preventDefault();
    console.log('start sliding', event);
  }

  private onSlideEnd() {
    console.log('end sliding');
  }

  private onNewRange() {
    const ranges = this.ranges.value;
    ranges.forEach(r => r.focused = false);
    ranges.push({
      start: null,
      end: null,
      focused: true
    });
    this.ranges.next(ranges);
  }

  private onRangeFocused(range: RangeInput): void {
    const ranges = this.ranges.value;
    ranges.forEach(r => r.focused = false);
    range.focused = true;
    this.ranges.next(ranges);
  }

  private setPanelStartPos(): void {
    const editPanel: HTMLElement = this.editPanel.nativeElement;
    const target = this.lastRangeDim;
    editPanel.style.transition = 'none';
    editPanel.style.display = 'block';
    this.fitPanelToDim();
    editPanel.offsetHeight;
    editPanel.style.transitionDuration = '225ms';
    editPanel.style.transitionTimingFunction = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    editPanel.style.transitionProperty = 'top, left, width, height';
  }

  private fitPanelToDim(): void {
    const editPanel: HTMLElement = this.editPanel.nativeElement;
    const target = this.lastRangeDim;
    editPanel.style.top = `${target.offsetTop}px`;
    editPanel.style.left = `${target.offsetLeft}px`;
    editPanel.style.width = `${target.clientWidth}px`;
    editPanel.style.height = `${target.clientHeight}px`;
  }

  private setPanelEndPos(): void {
    const editPanel = this.editPanel.nativeElement;
    editPanel.style.top = '0';
    editPanel.style.left = '0';
    editPanel.style.width = '100%';
    editPanel.style.height = '100%';
  }

  private onCancelRange(): void {
    const fRange = this.focusedRange.value;
    if (fRange.start === null || fRange.end === null) {
      this.ranges.next(this.ranges.value.filter(r => r !== fRange));
    } else {
      fRange.focused = false;
      this.ranges.next(this.ranges.value);
    }
  }

  private onApplyRange(): void {
    const fRange = this.focusedRange.value;
    if (!fRange) { console.error(`Can't apply range.`); return this.onCancelRange(); }
    const formValue = this.form.value;
    if (formValue.start === null || formValue.end === null) { return this.onCancelRange(); }
    fRange.start = formValue.start;
    fRange.end = formValue.end;
    fRange.focused = false;
    this.ranges.next(this.ranges.value);
  }


  private buildTiles(iterations: number, viewFunc: (number) => string): void {
    this.tiles = [];
    const step = this.maxTime / iterations;
    for (let i = 1; i <= iterations; ++i) {
      this.tiles.push({ value: i * step, view: viewFunc(i) });
    }
  }

  private hourViewFunc(i: number): string {
    return `${i - 1}`;
  }

  private weekdayViewFunc(i: number): string {
    return moment(i - 1, 'e').format('dddd');
  }

  private buildTilesFromMonth(): void {
    this.tiles = [];
    const year = new Date().getFullYear();
    let dayAcc = 0;
    for (let i = 1; i <= 12; ++i) {
      const dayNb = new Date(year, i, 0).getDate();
      dayAcc += dayNb;
      this.tiles.push({ value: dayAcc, view: moment(i, 'M').format('MMMM') });
    }
  }
}
