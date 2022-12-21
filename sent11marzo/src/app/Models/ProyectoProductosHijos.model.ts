import { ItemProyectoModel } from "../contenido/barra/item-proyecto/itemProyecto.model";
import { ModelItemProyecto } from "./ItemProyecto.model";
export interface ProyectoProductosHijos{
  id:Number;
  itemProyecto:ItemProyectoModel;
}
export interface ProyectoTablaHijos{
  id:Number;
  proyectoProductosHijos:ProyectoProductosHijos[];
  itemProyectos:ModelItemProyecto[];
}
