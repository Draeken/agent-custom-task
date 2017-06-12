import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

import { TimeBoundary } from '../core/recipes-state/recipes-state.interface';

@Pipe({
  name: 'timeBoundary'
})
export class TimeBoundaryPipe implements PipeTransform {

  transform(value: TimeBoundary, isDate: boolean = true, displayDate: boolean = true): string {
    const format = displayDate ? 'l LT' : 'LT';
    if (!value || (!value.target && !value.min && !value.max)) { return ''; };
    if (isDate) {
      if (value.target) {
        return moment(value.target).format(format);
      }
      if (!value.max) {
        return `after ${moment(value.min).format(format)}`;
      } else if (!value.min) {
        return `before ${moment(value.max).format(format)}`;
      }
      return `${moment(value.min).format(format)} - ${moment(value.max).format(format)}`;
    }
    if (value.target) {
      return moment.duration(value.target).humanize();
    }
    if (!value.max) {
      return `min ${moment.duration(value.min).humanize()}`;
    } else if (!value.min) {
      return `max ${moment.duration(value.max).humanize()}`;
    }
    return `${moment.duration(value.min).humanize()} - ${moment.duration(value.max).humanize()}`;
  }

}
