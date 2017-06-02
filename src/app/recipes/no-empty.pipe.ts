import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noEmpty'
})
export class NoEmptyPipe implements PipeTransform {

  transform(value: any, replacement: string): string {
    return value || value === 0 ? value : replacement;
  }

}
