import { ModelNotaventa } from "./Notaventa.model";
import { ProductoModel } from "./producto.model";

export interface ModelItemnotaventa{
  id:Number;
  precio:Number;
  cantidad:Number;
  subtotal:Number;
  cantidadpend:Number;
  notaventa:ModelNotaventa;
  producto:ProductoModel;
}
