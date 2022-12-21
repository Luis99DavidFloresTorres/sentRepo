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

@Injectable({
  providedIn: "root"
})
export class ServiceNotaAsigna{
  baseUrl = environment.baseUrl;
  subjectDevolucionHerramienta = new Subject<ModelNotaAsigna>();
  subjectAsignacionHerramienta = new Subject<ModelNotaAsigna>();
  subjectAllNotas= new Subject<ModelNotaAsigna[]>();
  constructor(private http:HttpClient){}
  getDevolucionHerramienta(){
    return this.subjectDevolucionHerramienta;
  }
  getAsignacionHerramienta(){
    return this.subjectAsignacionHerramienta;
  }
  encontrarNotas(){
    this.http.get<ModelNotaAsigna[]>(this.baseUrl+"/api/notaasigna/notas").subscribe(data=>{
      this.subjectAllNotas.next(data);
    })
  }

  listenerDevolucionHerramienta(){
    return this.subjectDevolucionHerramienta.asObservable();
  }
  listenerAllNotas(){
    return this.subjectAllNotas.asObservable();
  }
  listenerAsignacionHerramienta(){
    return this.subjectAsignacionHerramienta.asObservable();
  }
}
