import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacios'
})
export class VaciosPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(value==undefined){
      return "vacio";
    }
    return value;
  }

}
