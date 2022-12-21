import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";

import { ItemProyectoComponent } from "../contenido/barra/item-proyecto/item-proyecto.component";
import { ItemProyectoModel } from "../contenido/barra/item-proyecto/itemProyecto.model";
import { ItemDescargoModel } from "../Models/ItemDescargo.model";
import { ModelItemProyecto } from "../Models/ItemProyecto.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { ModelNotaAsigna } from "../Models/NotaAsigna.model";
import { NotaDescargoModel } from "../Models/NotaDescargo.model";
import { NotaSolicitudModel } from "../Models/NotaSolicitud.model";

@Injectable({
  providedIn: "root"
})
export class ServiceNotaDescargo{
  baseUrl = environment.baseUrl;
  subjectFindAll = new Subject<NotaDescargoModel[]>();
  subjectAllNotas= new Subject<NotaDescargoModel[]>();

  constructor(private http:HttpClient){}
  encontrarNotas(){
    this.http.get<NotaDescargoModel[]>(this.baseUrl+"/api/notadescargo/notas").subscribe(data=>{
      this.subjectAllNotas.next(data);
    })
  }

  findAll(){
    this.http.get<NotaDescargoModel[]>(this.baseUrl+"/api/notadescargo/findAll").subscribe(data=>{
      this.subjectFindAll.next(data);
    })
  }

  listenerAll(){
    return this.subjectFindAll.asObservable();
  }


}
