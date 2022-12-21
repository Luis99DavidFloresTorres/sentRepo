import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facturaPipe'
})
export class FacturaPipePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
      if(value==1){
        return "Si";
      }
      if(value==0){
        return "No"
      }
  }

}
