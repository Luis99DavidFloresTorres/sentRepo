import { CiudadesModel } from "../contenido/barra/codificador/ciudades/ciudades.model";
import { PaisModel } from "../contenido/barra/codificador/paises/pais.model";
import { RubroModel } from "../contenido/barra/codificador/rubros/rubros.model";

export interface ProveedorModel{
  nombre:String;
  id:Number;
  codigo:String;
  fax:String;
  cuentas:String;
  useract:String;
  telefono:Number;
  contactopre:String;
  email:String;
  fechaact:Date;
  celular:Number;
  casilla:String;
  direccion:String;
  ciudad:CiudadesModel;
  pais:PaisModel;
  rubro:RubroModel;
}
