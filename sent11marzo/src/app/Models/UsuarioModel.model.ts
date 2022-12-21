import { TipoUsuarioModel } from "./TipoUsuario.model";

export interface UsuarioModel{
  cuenta:String;
  contrasena:String;
  nombre:String;
  tipoUsuario:TipoUsuarioModel;
  comision:Number;
}
