import { Pipe, PipeTransform } from '@angular/core';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';

@Pipe({
  name: 'pipeDescuento'
})
export class PipePipe implements PipeTransform {

  transform(element:any): String {
    console.log(element)
    if(element.proyecto!=undefined ) {
      if(element.proyecto.cliente.tipodescto=='B'  ){
        return element.producto.desctob.toString();
      }else if(element.proyecto.cliente.tipodescto=='A'){
          return element.producto.desctoa.toString();
      }else if(element.proyecto.cliente.tipodescto=='C' ){
          return element.producto.desctoc.toString();
      }
    }
    if(element.cliente.tipodescto=='B'){
      return element.producto.desctob.toString();
    }else if(element.cliente.tipodescto=='A'){
      return element.producto.desctoa.toString();
    }else if (element.cliente.tipodescto=='C'){
      return element.producto.desctoc.toString();
    }
    if((!element.proyecto)){
      return 'N';
    }
    else{
      return '';
    }
  }

}
