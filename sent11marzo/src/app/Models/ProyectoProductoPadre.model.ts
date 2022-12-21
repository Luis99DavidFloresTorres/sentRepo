import { ProyectoSubproducto } from "./ProyectoSubproducto.model";

export interface ProyectoProductoPadre{
  id:Number;
  nombre:String;
  precio:Number;
  proyectoSubproducto:ProyectoSubproducto;
}
