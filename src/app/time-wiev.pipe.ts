import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeWiev'
})
export class TimeWievPipe implements PipeTransform {

  transform(value: any): any {
    const date = new Date(null);
    date.setSeconds(value);
    return date.toISOString().substr(11, 8);
  }

}
