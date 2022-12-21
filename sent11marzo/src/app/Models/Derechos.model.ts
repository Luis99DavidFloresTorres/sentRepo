import { ModuloModel } from "./Modulo.model";
import { TipoUsuarioModel } from "./TipoUsuario.model";

export interface DerechosModel{
  id:Number;
  nivel:Number;
  modulo:ModuloModel;
  tipousuario:TipoUsuarioModel;
}
