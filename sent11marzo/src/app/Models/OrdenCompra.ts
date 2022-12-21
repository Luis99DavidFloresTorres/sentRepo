import { ProveedorModel } from "./proveedor.model";

export interface ModelOrdenCompra{
  id:Number;
  transporte:String;
  ciudad: String;
  fecha:Date;
  nitfacturacion:Number;
  nrodoc: Number;
  detalle:String;
  oper:Number;
  proveedor:ProveedorModel;
  proveedorNombre:String;
  contactopre:String;
}
