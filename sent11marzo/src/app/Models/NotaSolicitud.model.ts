import { CotizacionModel } from "./Cotizacion.model";
import { ModelCotizacionProyecto } from "./CotizacionProyecto.model";

export interface NotaSolicitudModel{
  id:Number;
  estado:String;
  fecha:Date;
  useract:String;
  nrodoc:Number;
  montome:Number;
  detalle:String;
  fechaact:Date;
  monto:Number;
  montoTotal:Number;
  proyecto:ModelCotizacionProyecto;
  montodescargo:Number;
}
