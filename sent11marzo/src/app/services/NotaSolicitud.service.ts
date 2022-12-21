import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";

import { ItemProyectoComponent } from "../contenido/barra/item-proyecto/item-proyecto.component";
import { ItemProyectoModel } from "../contenido/barra/item-proyecto/itemProyecto.model";
import { ModelItemProyecto } from "../Models/ItemProyecto.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { ModelNotaAsigna } from "../Models/NotaAsigna.model";
import { NotaSolicitudModel } from "../Models/NotaSolicitud.model";
import { UsuarioModel } from "../Models/UsuarioModel.model";

@Injectable({
  providedIn: "root"
})
export class ServiceNotaSolicitud{
  baseUrl = environment.baseUrl;
  subjectSolicitudPresupuesto = new Subject<NotaSolicitudModel>();
  subjectFindAll = new Subject<NotaSolicitudModel[]>();
  subjectAllNotas= new Subject<ModelNotaAsigna[]>();
  subjectNotaSolicitud = new Subject<NotaSolicitudModel>();
  subjectEntreFechas= new Subject<NotaSolicitudModel[]>();
  subjectEntreFechasResponsableNombre = new Subject<NotaSolicitudModel[]>();
  subjectEntreFechasResponsableNombreDescargo = new Subject<NotaSolicitudModel[]>();
  constructor(private http:HttpClient){}
  encontrarNotas(){
    this.http.get<ModelNotaAsigna[]>(this.baseUrl+"/api/notasolicitud/notas").subscribe(data=>{
      this.subjectAllNotas.next(data);
    })
  }
  getNotaSolicitud(){
    return this.subjectNotaSolicitud;
  }
  findAll(){
    this.http.get<NotaSolicitudModel[]>(this.baseUrl+"/api/notasolicitud/findAll").subscribe(data=>{
      this.subjectFindAll.next(data);
    })
  }

  entreFechas(fechaInicio:Date, fechaFinal:Date){
    this.http.get<NotaSolicitudModel[]>(this.baseUrl+"/api/notasolicitud/entreFechas/"+fechaInicio+"/"+fechaFinal).subscribe(data=>{
      this.subjectEntreFechas.next(data);
    })
  }
  entreFechasResponsable(fechaInicio:Date, fechaFinal:Date, responsableNombre:String){
    this.http.get<NotaSolicitudModel[]>(this.baseUrl+"/api/notasolicitud/entreFechasCliente/"+fechaInicio+"/"+fechaFinal+"/"+responsableNombre).subscribe(data=>{
      this.subjectEntreFechasResponsableNombre.next(data);
    })
  }
  entreFechasResponsableDescargo(fechaInicio:Date, fechaFinal:Date, responsableNombre:String){
    this.http.get<NotaSolicitudModel[]>(this.baseUrl+"/api/notasolicitud/entreFechasCliente/"+fechaInicio+"/"+fechaFinal+"/"+responsableNombre).subscribe(data=>{
      this.subjectEntreFechasResponsableNombreDescargo.next(data);
    })
  }
  listenerAll(){
    return this.subjectFindAll.asObservable();
  }
  listenerNotaSolicitud(){
    return this.subjectNotaSolicitud.asObservable();
  }
  listenerSolicitudPresupuesto(){
    return this.subjectSolicitudPresupuesto.asObservable();
  }
  listenerEntreFechas(){
    return this.subjectEntreFechas.asObservable();
  }
  listenerResponsableNombre(){
    return this.subjectEntreFechasResponsableNombre.asObservable();
  }
  listenerResponsableNombreDescargo(){
    return this.subjectEntreFechasResponsableNombreDescargo.asObservable();
  }
}
