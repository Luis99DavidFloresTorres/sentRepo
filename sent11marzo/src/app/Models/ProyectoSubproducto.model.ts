import { ProductoModel } from "./producto.model";
import { ProyectoProductoPadre } from "./ProyectoProductoPadre.model";

export interface ProyectoSubproducto{
  id:Number;
  producto:ProductoModel;
  proyectoProductpadre:ProyectoProductoPadre;

}
