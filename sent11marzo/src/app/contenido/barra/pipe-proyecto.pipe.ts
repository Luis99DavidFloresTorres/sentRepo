import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeProyecto'
})
export class PipeProyectoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    var codigo = "P-SENT/";
    var operPrj = value.operprj
    var nroprj = value.nroprj
    switch(operPrj){
      case 411:
        codigo +="CIV/"+nroprj
        return codigo;
      case 421:
        codigo +="CP/"+nroprj
        return codigo;
      case 431:
        codigo +='CS/'+nroprj;
        return codigo;
    }
    codigo+='ADM/'+nroprj;
    return codigo;
  }

}
