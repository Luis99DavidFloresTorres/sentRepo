import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeNivel'
})
export class PipeNivelPipe implements PipeTransform {

  transform(value: any): String {
    if(value==undefined){
      return "1";
    }
    else return value;
  }
}
