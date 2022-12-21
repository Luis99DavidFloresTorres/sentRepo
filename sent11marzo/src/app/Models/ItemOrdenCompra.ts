import { ModelOrdenCompra } from "./OrdenCompra";
import { ProductoModel } from "./producto.model";

export interface ModelItemOrdenCompra{
  id:Number;
  precio:Number;
  cantidad:Number;
  ordencompra:ModelOrdenCompra;
  producto:ProductoModel;
  detalle:String;
  monto:Number;
  costoTotal:Number;
}
