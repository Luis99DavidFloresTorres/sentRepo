import{ProductoModel} from'../Models/producto.model';
import {ModelCotizacionProyecto} from'../Models/CotizacionProyecto.model';
import { ProyectoTablaHijos } from './ProyectoProductosHijos.model';
export interface ModelItemProyecto{
  id:Number;
  costo:Number;
  cantidad:Number;
  costocompra:Number;
  precioventa:Number;
  cantidadven:Number;
  compracf:Boolean;
  cantidadentr:Number;
  detalle:String;
  utilidad:Number;
  ventacf:Boolean;
  taxtransp:Number;
  importa:Boolean;
  origen:String;
  descto:Number;
  monto:Number;
  producto:ProductoModel;
  proyecto:ModelCotizacionProyecto;
  nivel:String;
  proyectoTablaHijos:ProyectoTablaHijos;
}
