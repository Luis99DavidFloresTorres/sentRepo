import { ModelCotizacionProyecto } from "./CotizacionProyecto.model";

export interface NotaDescargoModel{
  id:Number;
  responsable:String;
  estado:String;
  fecha:Date;
  nrodoc:Number;
  detalle:String;
  fechaact:Date;
  proyecto:ModelCotizacionProyecto;
  solicitud_id:Number;
  montoTotal:String;

}
