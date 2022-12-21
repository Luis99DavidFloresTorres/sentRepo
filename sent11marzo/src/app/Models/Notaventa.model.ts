import { ModelCliente } from "./Cliente.model";
import { ModelCotizacionProyecto } from "./CotizacionProyecto.model";

export interface ModelNotaventa{
  id:Number;
  total:Number;
  nrodoc:Number;
  estado:String;
  totalme:Number;
  operacion:String;
  oper:Number;
  detalle:String;
  cliente:ModelCliente;
  nrofac:Number;
  tc:Number;
  fecha:Date;
  proyecto:ModelCotizacionProyecto;

  nombreCliente:String;
  nombreProyecto:String; // aumentado el 15 de feberero de 2022
}
