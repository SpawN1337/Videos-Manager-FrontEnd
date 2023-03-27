import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    debugger;
    //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON.
    return value.filter(function (item : any) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(args)
    });
  }
}