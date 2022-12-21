import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oper'
})
export class OperacionDepositoPipe implements PipeTransform {

  transform(value: Number): any {
    switch(value){
      case 311:{
        return value+ ":Compra";

      }
      case 312:{
        return value+ ":Importacion";

      }
      case 314:{
        return value+ ":Cambio";

      }
      case 315:{
        return value+ ":Devolucion Proy";

      }
      case 316:{
        return value+ ":Devolucion";
      }
      case 317:{
        return value+ ":Donacion";
      }
      case 318:{
        return value+ ":Traspaso";
      }
      case 319:{
        return value+ ":Alta Aud";
      }
      case 321:{
        return value+ ":Venta";
      }
      case 322:{
        return value+ ":Prestamo";
      }
      case 324:{
        return value+ ":Cambio";
      }
      case 325:{
        return value+ ":Proyecto";
      }
      case 326:{
        return value+ ":Devolucion";
      }
      case 327:{
        return value+ ":Donacion";
      }
      case 328:{
        return value+ ":Traspaso";
      }
      case 329:{
        return value+ ":Baja Aud";

      }
    }
  }
}
