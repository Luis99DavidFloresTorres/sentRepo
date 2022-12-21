import { ActivoFijoModel } from "./ActivoFijo.model";
import { ModelNotaAsigna } from "./NotaAsigna.model";

export interface ModelItemAsigna{
  id:Number;
  estado:String;
  precio:Number;
  devuelto:Number;
  cantidad:Number;
  detalle:String;
  activofijo:ActivoFijoModel;
  notaasigna:ModelNotaAsigna;
}
