import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelCotizacionProyecto } from "../Models/CotizacionProyecto.model";
import { ModelItemProyecto } from "../Models/ItemProyecto.model";


@Injectable({
  providedIn: "root"
})
export class ServiceProyecto{
  baseUrl = environment.baseUrl;
  subjectTodosProyecto = new Subject<ModelCotizacionProyecto[]>();
  sujetoEstadoProyectos = new Subject<ModelCotizacionProyecto[]>();
  sujetoEstados  = new Subject<String[]>();
  subjectEntregaProductoProyecto = new Subject<ModelCotizacionProyecto>();
  subjectSeguimientoPorUsuario = new Subject<any[]>();
  subjectAdjudicarProyectoFormulario  = new Subject<ModelCotizacionProyecto>();
  subjectCobroProyecto = new Subject<ModelCotizacionProyecto>();
  subjectGestionProyecto = new Subject<ModelCotizacionProyecto>();
  subjectEstadosResponsables = new Subject<ModelCotizacionProyecto[]>();
  subjectSolicitudPresupuesto = new Subject<ModelCotizacionProyecto>();
  subjectByName= new Subject<String[]>();
  subjectDescargoGasto = new Subject<ModelCotizacionProyecto>();
  subjectInformeProyectoCotizacionProducto = new Subject<ModelCotizacionProyecto>();
  subjectResultadoPresumibleProyecto = new Subject<ModelCotizacionProyecto>();
  subjectEntregaProductoPorFecha = new Subject<ModelCotizacionProyecto>();
  constructor(private http:HttpClient){}
  obtenerTodosProyectos(){
    this.http.get<ModelCotizacionProyecto[]>(this.baseUrl+"/api/proyecto/obtenerTodos").subscribe(datos=>{
      this.subjectTodosProyecto.next(datos);
    })
  }
  getAdjudicarProyectoFormulario(){
    return this.subjectAdjudicarProyectoFormulario;
  }
  getEntregaProductoProyecto(){
    return this.subjectEntregaProductoProyecto;
  }
  getCobroProyecto(){
    return this.subjectCobroProyecto;
  }
  getResultadoPresumibleProyecto(){
    return this.subjectResultadoPresumibleProyecto;
  }
  getGestionProyecto(){
    return this.subjectGestionProyecto;
  }
  getSolicitudPresupuesto(){
    return this.subjectSolicitudPresupuesto;
  }
  getEntregaProdutoFecha(){
    return this.subjectEntregaProductoPorFecha;
  }
  getDescargoGasto(){
    return this.subjectDescargoGasto;
  }
  getInformeProyectoCotizacionProducto(){
    return this.subjectInformeProyectoCotizacionProducto;
  }
  estados(){
    this.http.get<String[]>(this.baseUrl+"/api/proyecto/estados").subscribe(datos=>{
      this.sujetoEstados.next(datos);
    })
  }
  estadoProyectos(fechaInicial:Date,fechaFinal:Date, estadoProyecto:String){
    this.http.get<ModelCotizacionProyecto[]>(this.baseUrl+"/api/proyecto/estadoProyecto/"+fechaInicial+"/"+fechaFinal+"/"+estadoProyecto).subscribe(datos=>{

      this.sujetoEstadoProyectos.next(datos);
    })
  }
  estadosResponsables(){
    this.http.get<ModelCotizacionProyecto[]>(this.baseUrl+"/api/proyecto/estadosReponsables").subscribe(datos=>{

      this.subjectEstadosResponsables.next(datos);
    })
  }
  byName(){
    this.http.get<String[]>(this.baseUrl+"/api/proyecto/byName").subscribe(datos=>{

      this.subjectByName.next(datos);
    })
  }

  seguimientoPorUsuario(proyecto:ModelCotizacionProyecto){
    this.http.post<any>(this.baseUrl+"/api/proyecto/seguimientoPorUsuario",proyecto).subscribe(datos=>{
      this.subjectSeguimientoPorUsuario.next(datos);
    });
  }
  listenerAdjudicarProyectoFormulario(){
    return this.subjectAdjudicarProyectoFormulario.asObservable();
  }
  listenerTodosProyecto(){
    return this.subjectTodosProyecto.asObservable();
  }
  listenerEstadoProyectos(){
    return this.sujetoEstadoProyectos.asObservable();
  }
  listenerEstados(){
    return this.sujetoEstados.asObservable();
  }
  listenerEntregaProductoProyecto(){
    return this.subjectEntregaProductoProyecto.asObservable();
  }
  listenerSeguimientoPorUsuario(){
    return this.subjectSeguimientoPorUsuario.asObservable();
  }
  listenerCobroProyecto(){
    return this.subjectCobroProyecto.asObservable();
  }
  listenerGestionProyecto(){
    return this.subjectGestionProyecto.asObservable();
  }
  listenerEstadosResponsables(){
    return this.subjectEstadosResponsables.asObservable();
  }
  listenerSolicitudPresupuesto(){
    return this.subjectSolicitudPresupuesto.asObservable();
  }
  listenerByName(){
    return this.subjectByName.asObservable();
  }
  listenerDescargoGasto(){
    return this.subjectDescargoGasto.asObservable();
  }
  listenerInformeProyectoCotizacionProducto(){
    return this.subjectInformeProyectoCotizacionProducto.asObservable();
  }
  listenerResultadoPresumibleProyecto(){
    return this.subjectResultadoPresumibleProyecto.asObservable();
  }
  listenerEntregaProductoPorFecha(){
    return this.subjectEntregaProductoPorFecha.asObservable();
  }
}
