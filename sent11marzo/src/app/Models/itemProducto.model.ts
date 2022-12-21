import { ProductoModel } from "./producto.model";
import { ModelTransproducto } from "./Transproducto.model";

export interface ItemProductoModel{
  id:Number;
  cantidad:Number;
  serial:String;
  costo:Number;
  costome:Number;
  monto:Number;
  producto:ProductoModel;
  transproducto:ModelTransproducto;
  //los datos de abajo son transient (no se encuentran en la base de datos)
  producto_id:Number
  observaciones:String
  fechaact:Date
  nombre:String
  codigo:String
  unidad:String
  proveedorNombre:String;
  clienteNombre:String;
  ingresos:Number;
  salidas:Number;
  nrodoc:Number
  ope:Number;
  saldo:Number
  invinicial:Number;
  precioTotal:Number;
}
