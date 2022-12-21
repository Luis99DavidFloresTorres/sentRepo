import { CodigoProducto } from "src/app/Models/Codigo.model";
import { UnidadModel } from "../contenido/barra/codificador/unidades/unidad.model";


export interface ProductoModel{
  id: String;
  invinicial: Number;
  costo: Number;
  detalle: String;
  codigo:String;
  ingresos: Number;
  nombre: String;
  salidas: Number;
  saldo: Number;
  precio:Number;
  modelo:String;
  unidad: UnidadModel;
  desctoa:Number;
  desctob:Number;
  desctoc:Number;
  utilidad: Number;
  imagen:String;
  color:String;
  preciome:Number;
  costome:Number;
  costoTotal:Number;
  marca:String;
  industria:String;
  tipo:String;
  codigoProductoNombre:String;
  urlPortada:String;
  unidadS:String;
  ruta_portada:String;
  rutaPortada:String;
  codigoProducto:CodigoProducto;
  serial:String;
  utilidadInforme:Number;
}
