import { PaisModel } from "../paises/pais.model";

export interface CiudadesModel{
  codigo:String;
  pais:PaisModel;
  nombre:String;
  id:any;
}
