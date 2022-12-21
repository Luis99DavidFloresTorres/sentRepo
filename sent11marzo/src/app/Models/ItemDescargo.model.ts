import { tipoGastoModel } from "../contenido/barra/codificador/tipos-gasto/tipoGasto.model";
import { NotaDescargoModel } from "./NotaDescargo.model";

export interface ItemDescargoModel{
  id:Number;
  precio:Number;
  preciome:Number;
  cantidad:Number;
  detalle:Number;
  monto:Number;
  notadescargo:NotaDescargoModel;
  gasto:tipoGastoModel;
  nrofact:Number;

  fecha:Date;
}
