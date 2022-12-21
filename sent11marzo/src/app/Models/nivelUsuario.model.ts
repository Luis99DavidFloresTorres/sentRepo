export interface ModelNivelUsuario{
  id:                      Number;
  nombre:                  String;
  descripcionNivelUsuario: DescripcionNivelUsuario[];
}

export interface DescripcionNivelUsuario {
  id:       Number;
  clase:    String;
  subclase: String;
}
export interface MandarUsuarioAgregarNivelUsuario{
  id:Number;
  nombre:String;
}
export interface UsuarioJson{
  usuario:String;
  contrasena:String;
}
