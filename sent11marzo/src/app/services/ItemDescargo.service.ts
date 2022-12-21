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
export class ServiceItemDescargo{
  baseUrl = environment.baseUrl;
  subjectNotas = new Subject<NotaDescargoModel[]>();
  subjectAllNotas= new Subject<NotaDescargoModel[]>();
  subjectItemDescargos = new Subject<ItemDescargoModel[]>();
  subjectByNotaDescargo = new Subject<ItemDescargoModel[]>();
  constructor(private http:HttpClient){}
  encontrarNotas(){
    this.http.get<NotaDescargoModel[]>(this.baseUrl+"/api/notadescargo/notas").subscribe(data=>{
      this.subjectAllNotas.next(data);
    })
  }
  getByNotaDescargo(){
    return this.subjectItemDescargos;
  }
  findNotasMonto(){
    this.http.get<NotaDescargoModel[]>(this.baseUrl+"/api/itemdescargo/buscarNotas").subscribe(data=>{

      this.subjectNotas.next(data);
    })
  }
  encontrarPorNotasDescargo(notaDescargo:NotaDescargoModel){
    this.http.post<ItemDescargoModel[]>(this.baseUrl+"/api/itemdescargo/findByNotaDescargo",notaDescargo).subscribe(data=>{
      this.subjectByNotaDescargo.next(data);
    })
  }
  listenerByNotaDescargo(){
    return this.subjectByNotaDescargo.asObservable();
  }
  listenerNotasMonto(){
    return this.subjectNotas.asObservable();
  }
  listenerNotaDescargo(){
    return this.subjectItemDescargos.asObservable();
  }

}
