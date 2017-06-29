import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  private year = new Date().getFullYear();

  transform(value: number, type: string): string {
    if (!Number.isInteger(value)) { return `${value}`; }
    switch (type) {
      case 'hour':
        return moment().hour(0).minute(value).format('HH:mm');
      case 'weekday':
        return `${moment().day(0).hour(0).minute(value).format('ddd-HH')}H`;
      case 'month':
        return `${moment().year(this.year).dayOfYear(value).format('MMM-DD')}`
    }
  }

}
