import { DepositoModel } from "../contenido/barra/codificador/depositos/deposito.model";
import { ModelCliente } from "./Cliente.model";
import { ModelCotizacionProyecto } from "./CotizacionProyecto.model";
import { ProveedorModel } from "./proveedor.model";

export interface ModelTransproducto{
  id:Number;
  oper:Number;
  fecha:Date;
  notaventa:Number;
  nrodoc:Number;
  detalle:String;
  cliente:ModelCliente;
  deposito:DepositoModel;
  proveedor:ProveedorModel;
  clienteNombre:String;
  proyecto:ModelCotizacionProyecto;
  proveedorNombre:String;
  factura:Number;
  proyectoNombre:String;
}
