import { UnidadModel } from "../unidades/unidad.model";

export interface tipoGastoModel{
  id:string|Number|undefined|null;
  codigo:String;
  tipo:String;
  precio:Number|undefined;
  nombre:String;
  unidad:UnidadModel|any;
}
